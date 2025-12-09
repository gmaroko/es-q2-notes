const isStorageAvailable = (() => {
  try {
    const k = "__test";
    window.localStorage.setItem(k, "1");
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
})();

export function getJSON(key, fallback = null) {
  if (!isStorageAvailable) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setJSON(key, value) {
  if (!isStorageAvailable) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function remove(key) {
  if (!isStorageAvailable) return;
  window.localStorage.removeItem(key);
}
