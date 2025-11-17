import { GAME_MODES, ASSIST_LIMITS } from "./constants";
import { computeRows } from "./utils";
import { isPairValid } from "./game";

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleBoard(state) {
  if (state.assists.shuffleUsed >= ASSIST_LIMITS.shuffle) return false;
  const values = state.grid.filter((x) => x != null);
  const empties = state.grid.length - values.length;
  shuffleArray(values);
  state.grid = [...values, ...Array(empties).fill(null)];
  state.assists.shuffleUsed += 1;
  state.lastMove = { type: "shuffle" };
  return true;
}

function revertLastMove(state) {
  if (!state.lastMove) return false;
  const { type } = state.lastMove;
  if (type === "pair") {
    const { aIdx, bIdx, a, b, prevScore } = state.lastMove;
    state.grid[aIdx] = a;
    state.grid[bIdx] = b;
    state.score = prevScore;
    state.lastMove = null;
    return true;
  }
  return false;
}

function eraseAt(state, idx) {
  if (state.assists.eraserUsed >= ASSIST_LIMITS.eraser) return false;
  if (state.grid[idx] == null) return false;
  const prev = state.grid[idx];
  state.grid[idx] = null;
  state.assists.eraserUsed += 1;
  state.lastMove = { type: "erase", idx, prev };
  return true;
}

function addNumbers(state) {
  if (state.assists.addNumbersUsed >= ASSIST_LIMITS.addNumbers) return false;
  const remaining = state.grid.filter((x) => x != null).length;
  // if (state.rows >= 50) return false;
  let toAdd = [];
  if (state.mode === GAME_MODES.CLASSIC) {
    toAdd = state.grid.filter((x) => x != null);
  } else if (state.mode === GAME_MODES.RANDOM) {
    const existing = state.grid.filter((x) => x != null);
    toAdd = shuffleArray(existing);
  } else {
    // CHAOTIC
    for (let i = 0; i < remaining; i += 1)
      toAdd.push(1 + Math.floor(Math.random() * 9));
  }

  const newGrid = state.grid.filter((x) => x != null);
  newGrid.push(...toAdd);
  // if (computeRows(newGrid.length) > 50) return false;
  state.grid = newGrid;
  state.rows = computeRows(state.grid.length);
  state.assists.addNumbersUsed += 1;
  state.lastMove = { type: "addNumbers", count: toAdd.length };
  return true;
}

function countValidMoves(state) {
  const filled = [];
  for (let i = 0; i < state.grid.length; i += 1)
    if (state.grid[i] != null) filled.push(i);
  let cnt = 0;
  for (let i = 0; i < filled.length; i += 1) {
    for (let j = i + 1; j < filled.length; j += 1) {
      if (isPairValid(state, filled[i], filled[j])) cnt += 1;
      if (cnt >= 6) return 6;
    }
  }
  return cnt;
}

export {
  shuffleArray,
  shuffleBoard,
  revertLastMove,
  addNumbers,
  eraseAt,
  countValidMoves,
};
