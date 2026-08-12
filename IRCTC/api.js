


async function apiFetch(url, opts = {}) {
  try {
    const token = localStorage.getItem('irctc_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(url, { ...opts, headers: { ...headers, ...opts.headers } });
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
  return await apiFetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingData) });
}

async function getMyBookings() {
  return await apiFetch('/api/bookings');
}

async function lookupTrains(query) {
  return await apiFetch(`/api/trains/lookup?q=${encodeURIComponent(query)}`);
}

async function getPNRStatus(pnr) {
  const result = await apiFetch(`/api/pnr/${encodeURIComponent(pnr)}`);
  if (result && result.success && result.data) return result.data;
  return null;
}


