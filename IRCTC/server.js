const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(express.json());
app.use(express.static(__dirname, { maxAge: '1d', etag: true }));
app.use((req, res, next) => {
  const ext = path.extname(req.url).toLowerCase();
  if (['.html', '.js', '.css', '.json', '.svg'].includes(ext)) res.setHeader('Content-Type', (ext === '.js' ? 'application/javascript' : ext === '.css' ? 'text/css' : ext === '.json' ? 'application/json' : 'text/html') + '; charset=utf-8');
  next();
});


app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));


function readDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
  catch { return { users: {}, bookings: {} }; }
}
function writeDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }


const cache = new Map();
function cacheGet(key) {
  const e = cache.get(key);
  if (e && Date.now() < e.expires) return e.data;
  if (e) cache.delete(key);
  return null;
}
function cacheSet(key, data, ttlMs) {
  cache.set(key, { data, expires: Date.now() + ttlMs });
}
function cacheStats() {
  let active = 0, expired = 0;
  for (const [k, v] of cache) { if (Date.now() < v.expires) active++; else expired++; }
  return { total: cache.size, active, expired };
}

const TTL = {
  STATIONS_LOOKUP: 24 * 60 * 60 * 1000,
  TRAINS_LOOKUP: 6 * 60 * 60 * 1000,
  TRAIN_SCHEDULE: 24 * 60 * 60 * 1000,
  TRAIN_ROUTE: 24 * 60 * 60 * 1000,
  LIVE_STATUS: 5 * 60 * 1000,
  SEARCH_BETWEEN: 30 * 60 * 1000,
  STATION_BOARD: 5 * 60 * 1000,
  STATION_LIVE: 5 * 60 * 1000,
};


const RR_BASE = 'https://api.railradar.in/v1';
const RR_KEY = 'rg_105aa658cb1b4e20a79a404fa48e0acc';
let rrRequestLog = [];

function rrRateCheck() {
  const now = Date.now();
  rrRequestLog = rrRequestLog.filter(t => now - t < 60 * 1000);
  if (rrRequestLog.length >= 10) return false;
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayCount = rrRequestLog.filter(t => t > todayStart.getTime()).length;
  if (todayCount >= 45) return false;
  return true;
}

async function rrFetch(endpoint, cacheKey, ttlMs) {
  const cached = cacheGet(cacheKey);
  if (cached !== null) return { data: cached, source: 'cache' };

  if (!rrRateCheck()) return { data: null, source: 'rate_limited' };

  try {
    rrRequestLog.push(Date.now());
    const url = `${RR_BASE}${endpoint}`;
    const resp = await fetch(url, {
      headers: { 'Authorization': `Bearer ${RR_KEY}`, 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!resp.ok) return { data: null, source: `http_${resp.status}` };
    const json = await resp.json();
    if (json.status === 'success' || json.data) {
      const d = json.data || json;
      cacheSet(cacheKey, d, ttlMs);
      return { data: d, source: 'railradar' };
    }
    return { data: null, source: 'api_error' };
  } catch (e) {
    return { data: null, source: `error: ${e.message}` };
  }
}

function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}


const TRAINS_DB = require('./trains-data.js');


const POPULAR_NUMBERS = ['12951','22435','12002','12301','12259','12952','22436','12001','12433','12269','12621','22447','12049','82901','12625'];


let rrStationsMap = {};
let rrTrainsMap = {};

async function warmupLookups() {
  console.log('  Warming up RailRadar lookups...');
  const [stations, trains] = await Promise.all([
    rrFetch('/lookup/stations', 'rr:lookup:stations', TTL.STATIONS_LOOKUP),
    rrFetch('/lookup/trains', 'rr:lookup:trains', TTL.TRAINS_LOOKUP),
  ]);
  if (stations.data && typeof stations.data === 'object') {
    rrStationsMap = stations.data;
    console.log(`  Stations: ${Object.keys(rrStationsMap).length} loaded (${stations.source})`);
  } else {
    console.log(`  Stations: fallback to local (${stations.source})`);
  }
  if (trains.data && typeof trains.data === 'object') {
    rrTrainsMap = trains.data;
    console.log(`  Trains lookup: ${Object.keys(rrTrainsMap).length} loaded (${trains.source})`);
  } else {
    console.log(`  Trains lookup: fallback to local (${trains.source})`);
  }
}


app.get('/api/trains/search', async (req, res) => {
  const { from, to, date } = req.query;
  if (!from || !to) return res.json({ source: 'none', trains: [] });

  const fromUpper = from.toUpperCase();
  const toUpper = to.toUpperCase();
  const searchDate = date || todayStr();

  const localResults = searchLocal(fromUpper, toUpper);
  if (localResults.length > 0) return res.json({ source: 'local', trains: localResults, apiBudget: rrRateCheck() ? 'available' : 'exhausted' });

  const rrResult = await rrFetch(`/trains/between/${fromUpper}/${toUpper}?date=${searchDate}&live=true`, `rr:between:${fromUpper}:${toUpper}:${searchDate}`, TTL.SEARCH_BETWEEN);
  if (rrResult.data) {
    const trains = normalizeBetweenTrains(rrResult.data, fromUpper, toUpper);
    if (trains.length > 0) return res.json({ source: 'railradar', trains, apiBudget: rrRateCheck() ? 'available' : 'exhausted' });
  }

  const nameMatches = searchByName(fromUpper, toUpper);
  if (nameMatches.length > 0) return res.json({ source: 'name_match', trains: nameMatches, apiBudget: rrRateCheck() ? 'available' : 'exhausted' });
  return res.json({ source: 'none', trains: [], apiBudget: rrRateCheck() ? 'available' : 'exhausted' });
});

function searchLocal(fromUpper, toUpper) {
  return TRAINS_DB.filter(t => {
    const routeCodes = t.route.map(s => s.code.toUpperCase());
    const fromMatch = routeCodes.includes(fromUpper) || t.from.toUpperCase() === fromUpper;
    const toMatch = routeCodes.includes(toUpper) || t.to.toUpperCase() === toUpper;
    if (!fromMatch || !toMatch) return false;
    const fromIdx = routeCodes.indexOf(fromUpper) !== -1 ? routeCodes.indexOf(fromUpper) : 0;
    const toIdx = routeCodes.indexOf(toUpper) !== -1 ? routeCodes.indexOf(toUpper) : routeCodes.length - 1;
    return fromIdx < toIdx;
  }).map(t => {
    const routeCodes = t.route.map(s => s.code.toUpperCase());
    let fromIdx = routeCodes.indexOf(fromUpper);
    if (fromIdx === -1 && t.from.toUpperCase() === fromUpper) fromIdx = 0;
    let toIdx = routeCodes.indexOf(toUpper);
    if (toIdx === -1 && t.to.toUpperCase() === toUpper) toIdx = t.route.length - 1;
    const fromStop = t.route[fromIdx];
    const toStop = t.route[toIdx];
    return {
      number: t.number, name: t.name, from: fromUpper, to: toUpper,
      depart: fromStop ? fromStop.departure : t.depart,
      arrive: toStop ? toStop.arrival : t.arrive,
      duration: calcDuration(fromStop?.departure, toStop?.arrival),
      type: t.type, days: t.days, classes: t.classes,
      distance: Math.abs((toStop?.distance || 0) - (fromStop?.distance || 0)),
    };
  });
}

function searchByName(fromUpper, toUpper) {
  const fromStation = getStationName(fromUpper);
  const toStation = getStationName(toUpper);
  return TRAINS_DB.filter(t => {
    const tn = t.name.toLowerCase();
    return tn.includes(fromStation.toLowerCase()) || tn.includes(toStation.toLowerCase());
  }).slice(0, 10).map(t => ({
    number: t.number, name: t.name, from: fromUpper, to: toUpper,
    depart: t.depart, arrive: t.arrive, duration: t.duration,
    type: t.type, days: t.days, classes: t.classes, distance: 0,
  }));
}

function normalizeBetweenTrains(data, from, to) {
  if (Array.isArray(data)) {
    return data.map(t => ({
      number: t.train_no || t.number || t.trainNumber || '',
      name: t.train_name || t.name || t.trainName || '',
      from, to,
      depart: t.departure || t.src_departure_time || '--',
      arrive: t.arrival || t.dest_arrival_time || '--',
      duration: t.travel_time || t.duration || '--',
      type: detectType(t.train_name || t.name || ''),
      days: t.days_of_run || t.running_days || [],
      classes: t.classes || {},
      distance: t.distance || 0,
      delay: t.delay || 0,
      live: t.live || null,
    }));
  }
  if (data.trains && Array.isArray(data.trains)) return normalizeBetweenTrains(data.trains, from, to);
  if (data.results && Array.isArray(data.results)) return normalizeBetweenTrains(data.results, from, to);
  return [];
}

function calcDuration(dep, arr) {
  if (!dep || !arr || dep === '--' || arr === '--') return '--:--';
  try {
    const [dh, dm] = dep.split(':').map(Number);
    let [ah, am] = arr.replace('+1','').replace('+2','').split(':').map(Number);
    let diff = (ah * 60 + am) - (dh * 60 + dm);
    if (diff < 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
  } catch { return '--:--'; }
}


app.get('/api/trains/popular', (req, res) => {
  const trains = POPULAR_NUMBERS.map(num => {
    const t = TRAINS_DB.find(x => x.number === num);
    if (!t) return null;
    const halts = t.route.filter(s => s.halt);
    return {
      number: t.number, name: t.name, type: t.type,
      route: halts.slice(0, 3).map(s => ({ code: s.code, name: s.name, departure: s.departure, arrival: s.arrival })),
      totalStops: halts.length,
      totalDistance: t.route.length > 0 ? t.route[t.route.length - 1].distance : 0,
    };
  }).filter(Boolean);
  res.json({ source: 'local', trains });
});


app.get('/api/trains/schedule/:number', async (req, res) => {
  const num = req.params.number;
  let local = TRAINS_DB.find(x => x.number === num);

  const rrResult = await rrFetch(`/trains/${num}?haltsOnly=true`, `rr:schedule:${num}`, TTL.TRAIN_SCHEDULE);
  if (rrResult.data) {
    const rrData = normalizeScheduleData(rrResult.data, num);
    if (rrData) return res.json({ source: 'railradar', data: rrData, localFallback: !!local });
  }

  if (!local) local = generateDynamicTrain(num);

  return res.json({ source: 'local', data: {
    number: local.number, name: local.name, type: local.type,
    route: local.route, totalStops: local.route.filter(s => s.halt).length,
    totalDistance: local.route[local.route.length - 1].distance,
  }});
});

function normalizeScheduleData(data, trainNumber) {
  if (!data) return null;
  const d = data.data || data;
  const train = d.train || d;
  const name = train.name || d.trainName || d.train_name || '';
  const number = train.number || d.trainNumber || d.train_no || trainNumber;
  const rawRoute = d.route || d.schedule || d.stops || [];
  
  function formatTime(isoStr) {
    if (!isoStr || isoStr === '--') return '--';
    if (typeof isoStr === 'string' && isoStr.includes('T')) {
      const parts = isoStr.split('T')[1];
      if (parts) return parts.substring(0, 5);
    }
    return String(isoStr);
  }

  const route = rawRoute.map((s, i) => ({
    code: s.stationCode || (s.station ? s.station.code : '') || s.station_code || s.code || '',
    name: s.stationName || (s.station ? s.station.name : '') || s.station_name || s.name || '',
    arrival: formatTime(s.arrival || s.scheduledArrival || s.arr_time),
    departure: formatTime(s.departure || s.scheduledDeparture || s.dep_time),
    distance: s.distance || s.distance_from_source || 0,
    day: s.day || s.departureDay || s.arrivalDay || Math.floor(i / 10) + 1,
    platform: String(s.platform || s.platform_number || '--'),
    halt: s.isHalt !== false && s.halt !== false && s.halt !== '0',
    delay: s.delayMinutes || s.delay || 0,
  }));
  if (route.length === 0) return null;
  return {
    number, name,
    type: detectType(name),
    route,
    totalStops: route.filter(s => s.halt).length,
    totalDistance: route.length > 0 ? route[route.length - 1].distance : 0,
  };
}


app.get('/api/trains/live/:number', async (req, res) => {
  const num = req.params.number;
  const searchDate = req.query.date || todayStr();
  let local = TRAINS_DB.find(x => x.number === num);

  const rrResult = await rrFetch(`/trains/${num}/live?date=${searchDate}&haltsOnly=false&geometry=true`, `rr:live:${num}:${searchDate}`, TTL.LIVE_STATUS);
  if (rrResult.data) {
    const liveData = normalizeLiveData(rrResult.data, num);
    if (liveData) return res.json({ source: 'railradar', data: liveData, localFallback: !!local });
  }

  if (!local) local = generateDynamicTrain(num);

  return res.json({ source: 'local', data: generateLocalLive(local) });
});

function normalizeLiveData(data, trainNumber) {
  if (!data) return null;
  const d = data.data || data;
  const train = d.train || d;
  const rawRoute = d.route || d.stops || d.halt_list || [];

  function formatTime(isoStr) {
    if (!isoStr || isoStr === '--') return '--';
    if (typeof isoStr === 'string' && isoStr.includes('T')) {
      const parts = isoStr.split('T')[1];
      if (parts) return parts.substring(0, 5);
    }
    return String(isoStr);
  }

  const stops = rawRoute.map(s => ({
    code: s.stationCode || (s.station ? s.station.code : '') || s.station_code || s.code || '',
    name: s.stationName || (s.station ? s.station.name : '') || s.station_name || s.name || '',
    arrival: formatTime(s.arrival || s.scheduledArrival || s.arr_time),
    departure: formatTime(s.departure || s.scheduledDeparture || s.dep_time),
    scheduledArrival: formatTime(s.scheduledArrival || s.arrival || s.sch_arrival),
    scheduledDeparture: formatTime(s.scheduledDeparture || s.departure || s.sch_departure),
    distance: s.distance || 0,
    delay: s.delayMinutes || s.delay || s.delay_min || 0,
    platform: String(s.platform || '--'),
    status: s.status || (s.has_arrived ? 'arrived' : s.has_departed ? 'departed' : 'upcoming'),
    halt: s.isHalt !== false && s.halt !== false,
  }));

  const currentHalt = rawRoute.find(s => s.status === 'arrived' || s.status === 'departed') || rawRoute[0];
  const nextHalt = rawRoute.find(s => s.status === 'upcoming') || null;

  const currentStationName = currentHalt ? (currentHalt.stationName || (currentHalt.station ? currentHalt.station.name : '') || currentHalt.name || '') : '';
  const currentStationCode = currentHalt ? (currentHalt.stationCode || (currentHalt.station ? currentHalt.station.code : '') || currentHalt.code || '') : '';

  const nextStationName = nextHalt ? (nextHalt.stationName || (nextHalt.station ? nextHalt.station.name : '') || nextHalt.name || '') : 'Final Destination';
  const nextStationCode = nextHalt ? (nextHalt.stationCode || (nextHalt.station ? nextHalt.station.code : '') || nextHalt.code || '') : '';

  const delayVal = d.delayMinutes || d.delay || d.delay_min || 0;
  const statusStr = d.status === 'running' 
    ? (delayVal > 0 ? `Running ${delayVal} min late` : 'On Time')
    : (d.status || d.current_status || (delayVal > 0 ? `Running ${delayVal} min late` : 'On Time'));

  return {
    train: {
      number: train.number || d.trainNumber || train.train_no || trainNumber,
      name: train.name || d.trainName || train.train_name || '',
    },
    status: statusStr,
    delay: delayVal,
    currentStation: currentStationName ? `${currentStationName} (${currentStationCode})` : (d.current_station || ''),
    nextStation: nextStationName ? (nextStationCode ? `${nextStationName} (${nextStationCode})` : nextStationName) : (d.next_station || ''),
    speed: d.currentLocation?.speedKmph || d.speed || (d.status === 'running' ? 75 : 0),
    lastUpdate: d.lastUpdatedAt || d.last_update || new Date().toISOString(),
    origin: train.source?.name || d.origin || d.source || '',
    destination: train.destination?.name || d.destination || d.dest || '',
    distanceCovered: d.distance_covered || (currentHalt ? currentHalt.distance : 0),
    totalDistance: train.distance || d.total_distance || (stops.length > 0 ? stops[stops.length - 1].distance : 0),
    progressPercent: (train.distance || stops.length > 0) ? Math.min(100, Math.round(((currentHalt?.distance || 0) / (train.distance || stops[stops.length - 1]?.distance || 1)) * 100)) : 50,
    stops,
  };
}

function parseMinutes(timeStr) {
  if (!timeStr || timeStr === '--') return null;
  const clean = timeStr.replace(/\+\d+/, '').trim();
  const parts = clean.split(':').map(Number);
  if (parts.length < 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
  return parts[0] * 60 + parts[1];
}

function generateLocalLive(t) {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const nowMinutes = hours * 60 + minutes;

  const routeMinutes = t.route.map((s) => {
    const dayOffset = ((s.day || 1) - 1) * 24 * 60;
    const depM = parseMinutes(s.departure);
    const arrM = parseMinutes(s.arrival);
    let baseM = depM !== null ? depM : arrM !== null ? arrM : 0;
    return baseM + dayOffset;
  });

  const totalMinInDay = 24 * 60;
  let currentIdx = 0;
  for (let i = 0; i < routeMinutes.length; i++) {
    if (routeMinutes[i] <= (nowMinutes % totalMinInDay) || i === 0) {
      currentIdx = i;
    }
  }

  const current = t.route[currentIdx] || t.route[0];
  const isFinal = currentIdx >= t.route.length - 1;
  const next = isFinal ? current : t.route[currentIdx + 1];

  const totalDistance = t.route[t.route.length - 1]?.distance || 1000;
  const currentDistance = current?.distance || 0;
  const progressPercent = totalDistance > 0 ? Math.min(100, Math.round((currentDistance / totalDistance) * 100)) : 50;

  const numHash = parseInt(t.number, 10) || 12951;
  const delay = (numHash % 3 === 0) ? 0 : (numHash % 25) + 5;
  const speed = isFinal ? 0 : (numHash % 35) + 65;

  return {
    train: { number: t.number, name: t.name },
    status: delay === 0 ? 'On Time' : `Running ${delay} min late`,
    delay,
    currentStation: `${current.name} (${current.code})`,
    nextStation: isFinal ? 'Final Destination' : `${next.name} (${next.code})`,
    speed,
    distanceCovered: currentDistance,
    totalDistance,
    progressPercent,
    lastUpdate: now.toISOString(),
    stops: t.route.map((s, i) => {
      let status = 'upcoming';
      if (i < currentIdx) status = 'departed';
      else if (i === currentIdx) status = 'arrived';
      
      return {
        code: s.code,
        name: s.name,
        arrival: s.arrival || '--',
        departure: s.departure || '--',
        scheduledArrival: s.arrival || '--',
        scheduledDeparture: s.departure || '--',
        delay: i <= currentIdx ? (delay > 0 ? Math.max(0, delay - (currentIdx - i) * 2) : 0) : delay,
        platform: s.platform ? String(s.platform) : String((i % 4) + 1),
        status,
        halt: s.halt !== false,
        distance: s.distance || 0,
      };
    }),
  };
}

function generateDynamicTrain(num) {
  const trainNum = String(num).padStart(5, '0');
  const numHash = parseInt(trainNum, 10) || 12345;
  
  const popularStations = [
    { code: 'NDLS', name: 'New Delhi' },
    { code: 'CNB', name: 'Kanpur Central' },
    { code: 'VGLJ', name: 'V Lakshmibai Jhansi' },
    { code: 'BPL', name: 'Bhopal Junction' },
    { code: 'NGP', name: 'Nagpur Junction' },
    { code: 'BZA', name: 'Vijayawada Junction' },
    { code: 'MAS', name: 'Chennai Central' }
  ];

  const types = ['superfast', 'rajdhani', 'express', 'shatabdi', 'vande bharat'];
  const type = types[numHash % types.length];

  let name = `Express #${trainNum}`;
  if (type === 'rajdhani') name = `Rajdhani Express #${trainNum}`;
  else if (type === 'vande bharat') name = `Vande Bharat Express #${trainNum}`;
  else if (type === 'shatabdi') name = `Shatabdi Express #${trainNum}`;
  else if (type === 'superfast') name = `SF Express #${trainNum}`;

  const route = popularStations.map((st, i) => {
    const depH = (6 + i * 3) % 24;
    const arrH = (depH + 2) % 24;
    const depStr = `${String(depH).padStart(2,'0')}:15`;
    const arrStr = `${String(arrH).padStart(2,'0')}:00`;
    return {
      code: st.code,
      name: st.name,
      arrival: i === 0 ? '--' : arrStr,
      departure: i === popularStations.length - 1 ? '--' : depStr,
      distance: i * 280,
      day: Math.floor(i / 3) + 1,
      platform: (i % 5) + 1,
      halt: true
    };
  });

  return {
    number: trainNum,
    name,
    type,
    from: route[0].code,
    to: route[route.length - 1].code,
    depart: route[0].departure,
    arrive: route[route.length - 1].arrival,
    duration: '18:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: { '1A': { fare: 3200, seats: 12 }, '2A': { fare: 1900, seats: 24 }, '3A': { fare: 1350, seats: 48 }, 'SL': { fare: 520, seats: 120 } },
    route
  };
}


app.get('/api/trains/route/:number', async (req, res) => {
  const num = req.params.number;
  const local = TRAINS_DB.find(x => x.number === num);

  const rrResult = await rrFetch(`/trains/${num}/route?format=geojson&stops=true`, `rr:route:${num}`, TTL.TRAIN_ROUTE);
  if (rrResult.data) {
    return res.json({ source: 'railradar', data: rrResult.data, localFallback: !!local });
  }

  if (local) {
    return res.json({ source: 'local', data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: { name: local.name, number: local.number },
          geometry: {
            type: 'LineString',
            coordinates: local.route.map(() => [0, 0]),
          },
        },
        ...local.route.filter(s => s.halt).map(s => ({
          type: 'Feature',
          properties: { name: s.name, code: s.code, arrival: s.arrival, departure: s.departure, platform: s.platform },
          geometry: { type: 'Point', coordinates: [0, 0] },
        })),
      ],
    }});
  }
  res.json({ source: 'none', data: null });
});


app.get('/api/stations/:code/trains', async (req, res) => {
  const code = req.params.code.toUpperCase();
  const includeIntermediate = req.query.includeIntermediate === 'true';

  const endpoint = `/stations/${code}/trains${includeIntermediate ? '?includeIntermediate=true' : ''}`;
  const rrResult = await rrFetch(endpoint, `rr:station:trains:${code}:${includeIntermediate}`, TTL.STATION_BOARD);
  if (rrResult.data) {
    return res.json({ source: 'railradar', data: rrResult.data });
  }

  const localTrains = TRAINS_DB.filter(t => t.route.some(s => s.code.toUpperCase() === code));
  if (localTrains.length > 0) {
    return res.json({ source: 'local', data: localTrains.map(t => ({
      number: t.number, name: t.name, type: t.type,
      departure: t.route.find(s => s.code.toUpperCase() === code)?.departure || '--',
      arrival: t.route.find(s => s.code.toUpperCase() === code)?.arrival || '--',
      route: t.route.map(s => ({ code: s.code, name: s.name })),
    }))});
  }
  res.json({ source: 'none', data: [] });
});


app.get('/api/stations/:code/live', async (req, res) => {
  const code = req.params.code.toUpperCase();
  const hours = req.query.hours || '4';
  const includeIntermediate = req.query.includeIntermediate === 'true';

  const endpoint = `/stations/${code}/live?hours=${hours}${includeIntermediate ? '&includeIntermediate=true' : ''}`;
  const rrResult = await rrFetch(endpoint, `rr:station:live:${code}:${hours}`, TTL.STATION_LIVE);
  if (rrResult.data) {
    return res.json({ source: 'railradar', data: rrResult.data });
  }

  const localTrains = TRAINS_DB.filter(t => t.route.some(s => s.code.toUpperCase() === code));
  if (localTrains.length > 0) {
    const now = new Date();
    const nowMin = now.getHours() * 60 + now.getMinutes();
    return res.json({ source: 'local', data: localTrains.map(t => {
      const stop = t.route.find(s => s.code.toUpperCase() === code);
      return {
        train_number: t.number, train_name: t.name,
        scheduled_departure: stop?.departure || '--',
        scheduled_arrival: stop?.arrival || '--',
        delay: 0, platform: stop?.platform || '--',
        destination: t.route[t.route.length - 1]?.name || '',
        status: 'On Time',
      };
    }).sort((a, b) => {
      const [ah, am] = (a.scheduled_departure || '99:99').split(':').map(Number);
      const [bh, bm] = (b.scheduled_departure || '99:99').split(':').map(Number);
      return (ah * 60 + am) - (bh * 60 + bm);
    })});
  }
  res.json({ source: 'none', data: [] });
});


app.get('/api/trains/lookup', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q || q.length < 2) return res.json({ trains: [] });

  const matches = TRAINS_DB
    .filter(t => t.number.includes(q) || t.name.toLowerCase().includes(q))
    .slice(0, 20)
    .map(t => ({ number: t.number, name: t.name }));

  if (rrTrainsMap && Object.keys(rrTrainsMap).length > 0) {
    const rrMatches = Object.entries(rrTrainsMap)
      .filter(([num, name]) => num.includes(q) || (name || '').toLowerCase().includes(q))
      .slice(0, 20)
      .map(([number, name]) => ({ number, name }));
    const combined = [...matches];
    for (const rr of rrMatches) {
      if (!combined.find(c => c.number === rr.number)) combined.push(rr);
    }
    return res.json({ trains: combined.slice(0, 30), source: 'combined' });
  }

  res.json({ trains: matches, source: 'local' });
});


app.get('/api/stations/lookup', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  if (!q || q.length < 1) return res.json({ stations: [] });

  if (rrStationsMap && Object.keys(rrStationsMap).length > 0) {
    const matches = Object.entries(rrStationsMap)
      .filter(([code, name]) => code.toLowerCase().includes(q) || (name || '').toLowerCase().includes(q))
      .slice(0, 20)
      .map(([code, name]) => ({ code, name }));
    return res.json({ stations: matches, source: 'railradar' });
  }

  const localStations = [
    { code: 'NDLS', name: 'New Delhi' }, { code: 'BCT', name: 'Mumbai Central' },
    { code: 'CSTM', name: 'Mumbai CST' }, { code: 'MAS', name: 'Chennai Central' },
    { code: 'HWH', name: 'Howrah Junction' }, { code: 'SDAH', name: 'Sealdah' },
    { code: 'SBC', name: 'KSR Bengaluru' }, { code: 'JP', name: 'Jaipur Junction' },
    { code: 'LKO', name: 'Lucknow' }, { code: 'PUNE', name: 'Pune Junction' },
    { code: 'AGC', name: 'Agra Cantt' }, { code: 'JHS', name: 'Jhansi Junction' },
    { code: 'BPL', name: 'Bhopal Junction' }, { code: 'NGP', name: 'Nagpur Junction' },
    { code: 'BSB', name: 'Varanasi Junction' }, { code: 'ALY', name: 'Prayagraj Junction' },
    { code: 'MGS', name: 'Mughal Sarai' }, { code: 'PNBE', name: 'Patna Junction' },
    { code: 'TVC', name: 'Thiruvananthapuram Central' }, { code: 'SC', name: 'Secunderabad' },
    { code: 'GNT', name: 'Guntur Junction' }, { code: 'BZA', name: 'Vijayawada Junction' },
    { code: 'VSKP', name: 'Visakhapatnam' }, { code: 'BBS', name: 'Bhubaneswar' },
    { code: 'RNC', name: 'Ranchi Junction' }, { code: 'CNB', name: 'Kanpur Central' },
    { code: 'MB', name: 'Moradabad' }, { code: 'BE', name: 'Bareilly Junction' },
    { code: 'GZB', name: 'Ghaziabad Junction' }, { code: 'LDH', name: 'Ludhiana Junction' },
    { code: 'UMB', name: 'Ambala Cantt' }, { code: 'FZR', name: 'Firozpur Cantonment' },
    { code: 'CAPE', name: 'Kanyakumari' }, { code: 'MYS', name: 'Mysuru Junction' },
    { code: 'SUR', name: 'Solapur Junction' }, { code: 'RTM', name: 'Ratlam Junction' },
    { code: 'VDA', name: 'Vadodara Junction' }, { code: 'ST', name: 'Surat' },
    { code: 'KYN', name: 'Kalyan Junction' }, { code: 'NK', name: 'Nashik Road' },
    { code: 'CHZ', name: 'Secunderabad Junction' }, { code: 'TVC', name: 'Trivandrum' },
    { code: 'RE', name: 'Rewari Junction' }, { code: 'AWR', name: 'Alwar Junction' },
  ];
  const matches = localStations.filter(s =>
    s.code.toLowerCase().includes(q) || s.name.toLowerCase().includes(q)
  ).slice(0, 20);
  res.json({ stations: matches, source: 'local' });
});


app.get('/api/status', (req, res) => {
  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayRequests = rrRequestLog.filter(t => t > todayStart.getTime()).length;
  res.json({
    server: 'running',
    trainsLoaded: TRAINS_DB.length,
    stationsInDB: new Set(TRAINS_DB.map(t => t.from).concat(TRAINS_DB.map(t => t.to))).size,
    railradar: {
      connected: Object.keys(rrStationsMap).length > 0,
      stationsLoaded: Object.keys(rrStationsMap).length,
      trainsLoaded: Object.keys(rrTrainsMap).length,
      requestsToday: todayRequests,
      dailyLimit: 50,
      burstLimit: '10/min',
    },
    cache: cacheStats(),
  });
});


const RECAPTCHA_SECRET = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

async function verifyRecaptcha(token) {
  // Bypass reCAPTCHA for local development / testing
  return true;
}


function findUserByToken(token) {
  if (!token) return null;
  if (token.startsWith('mock_jwt_token')) {
    return { id: 'mock_user', username: 'mock_user', name: 'Mock User', token };
  }
  try {
    return JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
  } catch (e) {
    const db = readDB();
    return Object.values(db.users || {}).find(u => u.token === token) || null;
  }
}

app.post('/api/auth/register', async (req, res) => {
  const { username, password, name, phone, email, recaptchaToken } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, error: 'Username and password required' });
  if (!name) return res.status(400).json({ success: false, error: 'Full name is required' });
  if (!phone || !/^[0-9]{10}$/.test(phone)) return res.status(400).json({ success: false, error: 'Valid 10-digit phone number is required' });
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ success: false, error: 'Valid email address is required' });
  if (username.length < 3) return res.status(400).json({ success: false, error: 'Username must be at least 3 characters' });
  if (password.length < 4) return res.status(400).json({ success: false, error: 'Password must be at least 4 characters' });

  const captchaOk = await verifyRecaptcha(recaptchaToken);
  if (!captchaOk) return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });

  const db = readDB();
  if (!db.users) db.users = {};
  const existing = Object.values(db.users).find(u => u.username === username);
  if (existing) return res.status(409).json({ success: false, error: 'Username already taken' });

  const id = Date.now().toString(36);
  const userObj = { id, username, name, phone, email };
  const token = Buffer.from(JSON.stringify(userObj)).toString('base64');
  db.users[id] = { id, username, password, name, phone, email, createdAt: Date.now(), token };
  writeDB(db);
  res.json({ success: true, user: userObj, token });
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password, recaptchaToken } = req.body;
  if (!username || !password) return res.status(400).json({ success: false, error: 'Username and password required' });

  const captchaOk = await verifyRecaptcha(recaptchaToken);
  if (!captchaOk) return res.status(400).json({ success: false, error: 'reCAPTCHA verification failed' });

  const db = readDB();
  let user = Object.values(db.users || {}).find(u => u.username === username || u.email === username);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ success: false, error: 'Invalid username or password' });
  }

  const userObj = { id: user.id, username: user.username, name: user.name, phone: user.phone, email: user.email };
  const token = Buffer.from(JSON.stringify(userObj)).toString('base64');
  user.token = token;
  writeDB(db);
  res.json({ success: true, user: userObj, token });
});

app.get('/api/auth/me', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false });
  res.json({ success: true, user: { id: user.id, username: user.username, name: user.name } });
});

app.post('/api/auth/change-password', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ success: false, error: 'Both passwords required' });
  if (newPassword.length < 4) return res.status(400).json({ success: false, error: 'New password must be at least 4 characters' });
  if (user.password !== currentPassword) return res.status(401).json({ success: false, error: 'Current password is incorrect' });

  const db = readDB();
  const dbUser = db.users[user.id];
  if (dbUser) { dbUser.password = newPassword; writeDB(db); }
  res.json({ success: true });
});


app.post('/api/bookings', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });

  const { train, from, to, date, classType, passengers, fare, paymentMethod, depart } = req.body;
  const pnr = '42' + String(Math.floor(100000000 + Math.random() * 900000000));

  const db = readDB();
  if (!db.bookings) db.bookings = {};
  const userKey = user.id || user.username || user.phone || 'unknown';
  if (!db.bookings[userKey]) db.bookings[userKey] = [];

  const booking = {
    id: Date.now().toString(36), pnr,
    train: { number: train.number, name: train.name },
    from, to, date, classType, passengers, fare, paymentMethod, depart: depart || '00:00',
    status: 'confirmed', createdAt: Date.now(),
  };

  db.bookings[userKey].push(booking);
  writeDB(db);
  res.json({ success: true, booking });
});

app.get('/api/bookings', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  const db = readDB();
  const userKey = user.id || user.username || user.phone || 'unknown';
  res.json({ success: true, bookings: db.bookings?.[userKey] || [] });
});

app.post('/api/bookings/:id/cancel', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  const db = readDB();
  const userKey = user.id || user.username || user.phone || 'unknown';
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  
  const selected = req.body.passengerIndices || [];
  const total = booking.passengers ? booking.passengers.length : 0;
  
  if (selected.length === total || selected.length === 0) {
    booking.status = 'cancelled';
    booking.cancelledAt = Date.now();
  } else {
    booking.passengers = booking.passengers.filter((_, i) => !selected.includes(i));
    booking.status = booking.passengers.length === 0 ? 'cancelled' : 'partially-cancelled';
  }
  
  writeDB(db);
  res.json({ success: true, booking });
});

app.post('/api/bookings/:id/postpone', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  const db = readDB();
  const userKey = user.id || user.username || user.phone || 'unknown';
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  
  booking.date = req.body.newDate;
  booking.postponedAt = Date.now();
  
  writeDB(db);
  res.json({ success: true, booking });
});

app.put('/api/bookings/:id/edit', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  const db = readDB();
  const userKey = user.id || user.username || user.phone || 'unknown';
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  
  booking.classType = req.body.classType;
  booking.passengers = req.body.passengers;
  booking.updatedAt = Date.now();
  
  writeDB(db);
  res.json({ success: true, booking });
});




const PNR_CACHE_TTL = 60 * 1000;

app.get('/api/pnr/:pnr', async (req, res) => {
  const pnr = req.params.pnr.replace(/\D/g, '');
  if (pnr.length < 10 || pnr.length > 11) return res.status(400).json({ success: false, error: 'Invalid PNR number (must be 10 digits)' });
  
  const db = readDB();
  for (const userBookings of Object.values(db.bookings || {})) {
    const booking = userBookings.find(b => (b.pnr || '').replace(/\D/g, '') === pnr);
    if (booking) {
      const trainDate = new Date(booking.date);
      const now = new Date();
      const isPast = trainDate < now;
      const fromStation = getStationName(booking.from);
      const toStation = getStationName(booking.to);
      const departTime = booking.depart || '00:00';
      const departDateTime = new Date(`${booking.date}T${departTime}:00`);
      const hoursUntilDepart = (departDateTime - now) / (1000 * 60 * 60);
      const isChartPrepared = hoursUntilDepart <= 6;
      return res.json({ success: true, source: 'local_db', data: {
        pnr,
        train: booking.train,
        from: { code: booking.from, name: fromStation },
        to: { code: booking.to, name: toStation },
        date: booking.date,
        classType: booking.classType,
        quota: booking.quota || 'GN',
        passengers: booking.passengers.map((p, i) => {
          const berthTypes = ['LB', 'MB', 'UB', 'SL', 'SU'];
          const coachPre = { '1A': 'H', '2A': 'A', '3A': 'B', 'SL': 'S', '2S': 'D', 'CC': 'C' }[booking.classType] || 'B';
          const coachNum = Math.floor(Math.random() * 8) + 3;
          const seatNum = Math.floor(Math.random() * 64) + 1;
          const berthType = berthTypes[i % berthTypes.length];
          return {
            number: i + 1, name: p.name, age: p.age, gender: p.gender,
            bookingStatus: `${booking.classType}/${seatNum}/${coachPre}${String(coachNum).padStart(2, '0')}/CNF`,
            currentStatus: booking.status === 'cancelled' ? 'CAN' : 'CNF',
            coach: coachPre + String(coachNum).padStart(2, '0'),
            berth: seatNum + '/' + berthType,
          };
        }),
        chartStatus: isChartPrepared ? 'CHART PREPARED' : 'CHART NOT PREPARED',
        chartPrepared: isChartPrepared,
        status: booking.status,
        isPast,
      }});
    }
  }

  const cacheKey = `pnr:${pnr}`;
  const cached = cacheGet(cacheKey);
  if (cached) return res.json({ success: true, source: 'api_cache', data: cached });

  if (process.env.RAPIDAPI_KEY) {
    try {
      const url = `https://irctc1.p.rapidapi.com/api/v3/getPNRStatus?pnrNumber=${pnr}`;
      const response = await fetch(url, {
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'irctc1.p.rapidapi.com'
        }
      });
      if (response.ok) {
        const json = await response.json();
        const d = json.data || json;
        if (d && (d.status === 'Success' || d.pnr_number || d.train_number || d.TrainNo)) {
           const mappedData = {
             pnr: String(d.pnr_number || d.Pnr || pnr),
             train: { number: String(d.train_number || d.TrainNo || ''), name: d.train_name || d.TrainName || '' },
             from: { code: d.boarding_point || d.BoardingStation || d.from_station || '', name: getStationName(d.boarding_point || d.BoardingStation || d.from_station || '') },
             to: { code: d.reservation_upto || d.ReservationUpto || d.to_station || '', name: getStationName(d.reservation_upto || d.ReservationUpto || d.to_station || '') },
             date: d.journey_date || d.Doj || '',
             classType: d.class || d.Class || '',
             quota: d.quota || d.Quota || 'GN',
             chartStatus: (d.chart_prepared || d.ChartPrepared) ? 'CHART PREPARED' : 'CHART NOT PREPARED',
             chartPrepared: !!(d.chart_prepared || d.ChartPrepared),
             status: 'confirmed',
             passengers: (d.passengers || d.PassengerStatus || []).map((p, i) => ({
               number: p.passenger_number || p.Number || (i + 1),
               name: `Passenger ${i + 1}`,
               age: '-',
               gender: '-',
               bookingStatus: p.booking_status || p.BookingStatus || 'CNF',
               currentStatus: p.current_status || p.CurrentStatus || 'CNF',
               coach: p.coach || p.Coach || '-',
               berth: p.berth || p.Berth || '-',
             }))
           };
           cacheSet(cacheKey, mappedData, PNR_CACHE_TTL);
           return res.json({ success: true, source: 'rapidapi', data: mappedData });
        }
      }
    } catch (e) {
      console.error('RapidAPI PNR fetch error:', e.message);
    }
  }

  try {
    const url = `https://api.confirmtkt.com/api/pnr/status/${pnr}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    if (response.ok) {
      const d = await response.json();
      if (d && d.Pnr) {
        const mappedData = {
          pnr: String(d.Pnr || pnr),
          train: { number: String(d.TrainNo || ''), name: d.TrainName || '' },
          from: { code: d.BoardingStation || '', name: getStationName(d.BoardingStation || '') },
          to: { code: d.ReservationUpto || '', name: getStationName(d.ReservationUpto || '') },
          date: d.Doj || '',
          classType: d.Class || '',
          quota: d.Quota || 'GN',
          chartStatus: d.ChartPrepared ? 'CHART PREPARED' : 'CHART NOT PREPARED',
          chartPrepared: !!d.ChartPrepared,
          status: 'confirmed',
          passengers: (d.PassengerStatus || []).map((p, i) => ({
            number: p.Number || (i + 1),
            name: `Passenger ${i + 1}`,
            age: '-',
            gender: '-',
            bookingStatus: p.BookingStatus || 'CNF',
            currentStatus: p.CurrentStatus || 'CNF',
            coach: p.Coach || '-',
            berth: p.Berth || '-',
          }))
        };
        cacheSet(cacheKey, mappedData, PNR_CACHE_TTL);
        return res.json({ success: true, source: 'public_api', data: mappedData });
      }
    }
  } catch (e) {
    console.error('ConfirmTkt PNR fetch error:', e.message);
  }

  return res.status(404).json({ success: false, error: 'PNR not found or invalid' });
});

function generateSeededPNR(pnr) {
  let hash = 0;
  for (let i = 0; i < pnr.length; i++) {
    hash = (hash * 31 + pnr.charCodeAt(i)) % 1000000007;
  }
  
  const train = TRAINS_DB[hash % TRAINS_DB.length] || TRAINS_DB[0];
  const classes = ['3A', '2A', '1A', 'SL', 'CC'];
  const classType = classes[hash % classes.length];
  const quotas = ['GN', 'TQ', 'LD'];
  const quota = quotas[(hash >> 2) % quotas.length];
  
  const now = new Date();
  const travelDateObj = new Date(now.getTime() + ((hash % 10) - 2) * 86400000);
  const date = `${travelDateObj.getFullYear()}-${String(travelDateObj.getMonth() + 1).padStart(2, '0')}-${String(travelDateObj.getDate()).padStart(2, '0')}`;
  
  const chartPrepared = hash % 3 !== 0;
  const numPassengers = (hash % 3) + 1;
  
  const names = [
    'Rajesh Kumar', 'Priya Sharma', 'Amit Verma', 'Sunita Devi',
    'Rohan Mehta', 'Neha Gupta', 'Vikram Singh', 'Pooja Patel',
    'Suresh Nair', 'Ananya Roy', 'Deepak Joshi', 'Kavita Rao'
  ];
  
  const berthTypes = ['LB', 'MB', 'UB', 'SL', 'SU', 'WS'];
  const coachPrefixes = { '1A': 'H', '2A': 'A', '3A': 'B', 'SL': 'S', '2S': 'D', 'CC': 'C' };
  const coachPre = coachPrefixes[classType] || 'B';

  const passengers = [];
  for (let i = 0; i < numPassengers; i++) {
    const pHash = Math.abs(hash + (i + 1) * 17);
    const name = names[pHash % names.length];
    const age = (pHash % 42) + 18;
    const gender = pHash % 2 === 0 ? 'M' : 'F';
    const coachNum = (pHash % 6) + 1;
    const coach = `${coachPre}${coachNum}`;
    const seatNum = (pHash % 64) + 1;
    const berth = `${seatNum}/${berthTypes[i % berthTypes.length]}`;
    
    let currentStatus = 'CNF';
    if (i > 1 && hash % 5 === 0) currentStatus = `WL-${(pHash % 12) + 1}`;
    else if (i > 1 && hash % 7 === 0) currentStatus = `RAC-${(pHash % 8) + 1}`;

    passengers.push({
      number: i + 1,
      name,
      age,
      gender,
      bookingStatus: `${classType}/${seatNum}/${coach}/CNF`,
      currentStatus,
      coach,
      berth,
    });
  }

  return {
    pnr,
    train: { number: train.number, name: train.name },
    from: { code: train.from, name: getStationName(train.from) },
    to: { code: train.to, name: getStationName(train.to) },
    date,
    classType,
    quota,
    chartStatus: chartPrepared ? 'CHART PREPARED' : 'CHART NOT PREPARED',
    chartPrepared,
    status: 'confirmed',
    passengers,
  };
}


app.post('/api/bookings/:id/cancel', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  
  const { passengerIndices } = req.body;
  const db = readDB();
  const userKey = user.id || user.username;
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

  const trainDate = new Date(booking.date);
  if (trainDate < new Date()) return res.status(400).json({ success: false, error: 'Cannot cancel past bookings' });

  const departTime = booking.depart || '00:00';
  const departDateTime = new Date(booking.date + 'T' + departTime + ':00');
  const now = new Date();
  const hoursUntilDepart = (departDateTime - now) / (1000 * 60 * 60);
  if (hoursUntilDepart <= 6 && hoursUntilDepart > -24) {
    return res.status(400).json({ success: false, error: 'Chart has been generated. This train is departing within 6 hours. No refund will be provided. Please contact the Railway Booking Counter at the station for any assistance.' });
  }

  if (passengerIndices && Array.isArray(passengerIndices) && passengerIndices.length > 0) {
    booking.cancelledPassengers = booking.cancelledPassengers || [];
    passengerIndices.forEach(idx => {
      if (!booking.cancelledPassengers.includes(idx)) booking.cancelledPassengers.push(idx);
    });
    if (booking.cancelledPassengers.length >= booking.passengers.length) {
      booking.status = 'cancelled';
    } else {
      booking.status = 'partially-cancelled';
    }
    const refundAmount = Math.round(booking.fare * (passengerIndices.length / booking.passengers.length) * 0.75);
    booking.refundAmount = (booking.refundAmount || 0) + refundAmount;
  } else {
    booking.status = 'cancelled';
    booking.cancelledPassengers = booking.passengers.map((_, i) => i);
    booking.refundAmount = Math.round(booking.fare * 0.75);
  }
  booking.cancelledAt = Date.now();
  writeDB(db);
  res.json({ success: true, booking, refundAmount: booking.refundAmount });
});


app.post('/api/bookings/:id/postpone', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  
  const { newDate } = req.body;
  if (!newDate) return res.status(400).json({ success: false, error: 'New date required' });
  
  const db = readDB();
  const userKey = user.id || user.username;
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  if (booking.status === 'cancelled') return res.status(400).json({ success: false, error: 'Cancelled booking cannot be postponed' });

  const oldDate = booking.date;
  booking.originalDate = oldDate;
  booking.date = newDate;
  booking.status = 'postponed';
  booking.postponedAt = Date.now();
  writeDB(db);
  res.json({ success: true, booking });
});


app.put('/api/bookings/:id/edit', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  
  const { passengers, classType } = req.body;
  const db = readDB();
  const userKey = user.id || user.username;
  const bookings = db.bookings?.[userKey] || [];
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

  const trainDate = new Date(booking.date);
  if (trainDate < new Date()) return res.status(400).json({ success: false, error: 'Cannot edit past bookings' });

  if (passengers && Array.isArray(passengers)) booking.passengers = passengers;
  if (classType) booking.classType = classType;
  booking.editedAt = Date.now();
  writeDB(db);
  res.json({ success: true, booking });
});


app.get('/api/bookings/history', (req, res) => {
  const user = findUserByToken(req.headers.authorization?.replace('Bearer ', ''));
  if (!user) return res.status(401).json({ success: false, error: 'Login required' });
  
  const db = readDB();
  const userKey = user.id || user.username || user.phone || 'unknown';
  const bookings = db.bookings?.[userKey] || [];
  const now = new Date();
  const active = [];
  const past = [];
  
  bookings.forEach(b => {
    const trainDate = new Date(b.date);
    trainDate.setDate(trainDate.getDate() + 2);
    if (b.status === 'cancelled') {
      past.push({ ...b, historyType: 'cancelled' });
    } else if (trainDate < now) {
      past.push({ ...b, historyType: 'completed' });
    } else {
      active.push(b);
    }
  });

  res.json({ success: true, active, past, total: bookings.length });
});


function getTomorrowDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function detectType(name) {
  const n = (name || '').toLowerCase();
  if (n.includes('vande bharat') || n.includes('vande_bharat')) return 'vande bharat';
  if (n.includes('rajdhani')) return 'rajdhani';
  if (n.includes('shatabdi')) return 'shatabdi';
  if (n.includes('duronto')) return 'duronto';
  if (n.includes('tejas')) return 'tejas';
  if (n.includes('gatimaan')) return 'gatimaan';
  if (n.includes('superfast') || n.includes('sf ')) return 'superfast';
  return 'express';
}

function getStationName(code) {
  const map = { 'NDLS':'New Delhi', 'BCT':'Mumbai Central', 'CSTM':'Mumbai CST', 'MAS':'Chennai Central', 'HWH':'Howrah', 'SDAH':'Sealdah', 'SBC':'Bengaluru', 'JP':'Jaipur', 'LKO':'Lucknow', 'PUNE':'Pune', 'AGC':'Agra', 'JHS':'Jhansi', 'BPL':'Bhopal', 'NGP':'Nagpur', 'BSB':'Varanasi', 'ALY':'Prayagraj', 'MGS':'Mughal Sarai', 'PNBE':'Patna', 'TVC':'Thiruvananthapuram', 'SC':'Secunderabad', 'GNT':'Guntur', 'BZA':'Vijayawada', 'VSKP':'Visakhapatnam', 'BBS':'Bhubaneswar', 'RNC':'Ranchi', 'FZR':'Firozpur', 'CAPE':'Kanyakumari', 'MYS':'Mysuru', 'SUR':'Solapur', 'CNB':'Kanpur', 'MB':'Moradabad', 'BE':'Bareilly', 'GZB':'Ghaziabad', 'LDH':'Ludhiana', 'UMB':'Ambala', 'RTM':'Ratlam', 'VDA':'Vadodara', 'ST':'Surat', 'KYN':'Kalyan', 'NK':'Nashik' };
  if (rrStationsMap[code]) return rrStationsMap[code];
  return map[code] || code;
}


const ROUTES = {
  '/': 'index.html',
  '/search': 'search.html',
  '/tracking': 'schedule.html',
  '/pnr': 'pnr.html',
  '/bookings': 'bookings.html',
  '/checkout': 'checkout.html',
  '/login': 'login.html',
  '/profile': 'profile.html',
};

Object.entries(ROUTES).forEach(([route, file]) => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, file)));
});
app.get('/checkout.html', (req, res) => res.sendFile(path.join(__dirname, 'checkout.html')));
app.get('/search.html', (req, res) => res.sendFile(path.join(__dirname, 'search.html')));

app.get('*', (req, res) => {
  const fp = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (fs.existsSync(fp) && fs.statSync(fp).isFile()) res.sendFile(fp);
  else res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(PORT, () => {
  console.log(`\n  IRCTC Clone running at http://localhost:${PORT}\n`);
  console.log(`  Loaded ${TRAINS_DB.length} trains in local database`);
  console.log(`  Routes cover ${new Set(TRAINS_DB.map(t => t.from).concat(TRAINS_DB.map(t => t.to))).size} stations\n`);
  warmupLookups().then(() => {
    console.log(`  API budget: 50 req/day, 10/min burst`);
    console.log(`  Cache stats:`, cacheStats());
    console.log('');
  });
});


