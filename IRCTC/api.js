


async function apiFetch(url, opts = {}) {
  try {
    const token = localStorage.getItem('irctc_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { ...opts, headers: { ...headers, ...opts.headers } });
    if (res.status === 401 && !url.includes('/auth/login')) {
      localStorage.removeItem('irctc_current_user');
      localStorage.removeItem('irctc_token');
      window.location.href = '/login';
      return { success: false, error: 'Session expired. Please login again.' };
    }
    return await res.json();
  } catch (e) { console.warn('API error:', e.message); return { success: false }; }
}

function requireLogin() {
  const user = getCurrentUser();
  if (!user) {
    showToast('Please login to continue', 'error');
    setTimeout(() => window.location.href = '/login', 1000);
    return false;
  }
  return true;
}

async function searchTrainsBetween(fromCode, toCode) {
  return await apiFetch(`/api/trains/search?from=${fromCode}&to=${toCode}`);
}

async function getTrainScheduleData(trainNumber) {
  const result = await apiFetch(`/api/trains/schedule/${trainNumber}`);
  if (result && result.data) return result.data;
  return null;
}

async function getLiveTrainStatus(trainNumber) {
  const result = await apiFetch(`/api/trains/live/${trainNumber}`);
  if (result && result.data) return result.data;
  return null;
}

async function createBooking(bookingData) {
  const result = await apiFetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
  // Also save to localStorage so bookings survive Render redeploys
  if (result && result.success && result.booking) {
    try {
      const saved = JSON.parse(localStorage.getItem('irctc_bookings') || '[]');
      saved.push(result.booking);
      localStorage.setItem('irctc_bookings', JSON.stringify(saved));
    } catch(e) {}
  }
  return result;
}

async function getMyBookings() {
  const serverResult = await apiFetch('/api/bookings');
  const serverBookings = (serverResult && serverResult.success) ? (serverResult.bookings || []) : [];
  // Merge with localStorage bookings (survives Render redeploys)
  let localBookings = [];
  try { localBookings = JSON.parse(localStorage.getItem('irctc_bookings') || '[]'); } catch(e) {}
  // Deduplicate by PNR
  const pnrSet = new Set(serverBookings.map(b => b.pnr));
  const merged = [...serverBookings];
  for (const lb of localBookings) {
    if (!pnrSet.has(lb.pnr)) merged.push(lb);
  }
  // Sync merged list back to localStorage
  try { localStorage.setItem('irctc_bookings', JSON.stringify(merged)); } catch(e) {}
  return { success: true, bookings: merged };
}

async function lookupTrains(query) {
  return await apiFetch(`/api/trains/lookup?q=${encodeURIComponent(query)}`);
}

async function getPNRStatus(pnr) {
  const result = await apiFetch(`/api/pnr/${encodeURIComponent(pnr)}`);
  if (result && result.success && result.data) return result.data;
  return null;
}


