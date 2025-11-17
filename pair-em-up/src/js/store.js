const LS_KEY = "pair-em-up-save";
const LS_RESULTS = "pair-em-up-results";
const LS_SETTINGS = "pair-em-up-settings";

function saveToLocalStorage(state) {
  const data = {
    mode: state.mode,
    grid: state.grid,
    score: state.score,
    targetScore: state.targetScore,
    timerMs: state.timerMs,
    assists: state.assists,
    movesMade: state.movesMade,
    lastMove: state.lastMove,
  };
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function loadFromLocalStorage() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function saveResult(entry) {
  const raw = localStorage.getItem(LS_RESULTS);
  const list = raw ? JSON.parse(raw) : [];
  list.unshift(entry);
  localStorage.setItem(LS_RESULTS, JSON.stringify(list.slice(0, 5)));
}

function loadResults() {
  const raw = localStorage.getItem(LS_RESULTS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveSettings(settings) {
  localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
}
function loadSettings() {
  const raw = localStorage.getItem(LS_SETTINGS);
  if (!raw) return { theme: "dark", sound: true, music: true };
  try {
    return JSON.parse(raw);
  } catch {
    return { theme: "dark", sound: true, music: true };
  }
}

export {
  saveToLocalStorage,
  loadFromLocalStorage,
  saveResult,
  loadResults,
  saveSettings,
  loadSettings,
};
