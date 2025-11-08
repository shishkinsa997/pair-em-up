import { GAME_MODES, ASSIST_LIMITS } from "./constants";
import { computeRows } from "./utils";

function generateInitialNumbers(mode) {
  if (mode === GAME_MODES.CLASSIC || mode === GAME_MODES.RANDOM) {
    const base = [];
    for (let i = 1; i <= 9; i += 1) base.push(i);
    for (let i = 1; i <= 9; i += 1) base.push(i);
    return base;
  }
  const arr = [];
  for (let i = 0; i < 27; i += 1) arr.push(1 + Math.floor(Math.random() * 9));
  return arr;
}

function initGame(state, mode) {
  state.mode = mode;
  state.grid = generateInitialNumbers(mode);
  state.rows = computeRows(state.grid.length);
  state.score = 0;
  state.selectedIndices = [];
  state.timerMs = 0;
  state.running = true;
  state.lastMove = null;
  state.assists = { addNumbersUsed: 0, shuffleUsed: 0, eraserUsed: 0 };
  state.movesMade = 0;
}

export { GAME_MODES, ASSIST_LIMITS, initGame };
