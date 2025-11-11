import { formatMs } from "./utils";
import { state } from "./constants";

let timer = null;
let timerId = null;

function startTimer() {
  timer = document.getElementById("timer");
  if (timerId) return;
  const startedAt = Date.now() - state.timerMs;
  timerId = setInterval(() => {
    state.timerMs = Date.now() - startedAt;
    timer.textContent = `Time: ${formatMs(state.timerMs)}`;
  }, 250);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
  timerId = null;
}

export { startTimer, stopTimer };
