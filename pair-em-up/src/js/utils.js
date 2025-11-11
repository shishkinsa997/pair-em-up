import { loadSettings } from "./store.js";

function el(tag, options = {}) {
  const e = document.createElement(tag);
  if (options.className) e.className = options.className;
  if (options.id) e.id = options.id;
  if (options.text) e.textContent = options.text;
  if (options.html) e.innerHTML = options.html;
  if (options.attrs) {
    for (const k in options.attrs) e.setAttribute(k, options.attrs[k]);
  }
  return e;
}

function computeRows(gridLength) {
  return Math.ceil(gridLength / 9);
}

function formatMs(ms) {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

let audioCtx = null;
function playTone(freq = 440, durMs = 120, vol = 0.04) {
  if (!loadSettings().sound) return console.log(loadSettings().sound);
  // console.log(loadSettings().sound);
  if (!audioCtx)
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.frequency.value = freq;
  o.type = "sine";
  g.gain.value = vol;
  o.connect(g);
  g.connect(audioCtx.destination);
  o.start();
  setTimeout(() => {
    o.stop();
    o.disconnect();
    g.disconnect();
  }, durMs);
}

export { el, computeRows, formatMs, playTone };
