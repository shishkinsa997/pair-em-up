import { GAME_MODES, ASSIST_LIMITS } from "./constants";
import { shuffleArray, countValidMoves } from "./gameHelpers";
import { computeRows } from "./utils";

function generateInitialNumbers(mode) {
  if (mode === GAME_MODES.CLASSIC || mode === GAME_MODES.RANDOM) {
    const rawBase = [];
    for (let i = 1; i <= 19; i += 1) rawBase.push(i);
    rawBase.filter((x) => x % 10 !== 0);
    if (mode === GAME_MODES.RANDOM)
      return toSeparateArray(shuffleArray([...rawBase]));
    const base = toSeparateArray(rawBase);
    let b = 63 - base.length;
    if (b <= 0) {
      b = 9 - (base.length - 9 * Math.floor(base.length / 9));
    }
    for (let i = 1; i <= b; i += 1) base.push(null);
    return base;
  }
  const arr = [];
  for (let i = 0; i < 27; i += 1) arr.push(1 + Math.floor(Math.random() * 9));
  for (let i = 0; i < 9; i += 1) arr.push(null);
  return arr;
}

function toSeparateArray(arr) {
  return arr
    .filter((x) => x % 10 !== 0)
    .flatMap((num) => num.toString().split("").map(Number));
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

function isPairValid(state, aIdx, bIdx) {
  if (aIdx === bIdx) return false;
  const a = state.grid[aIdx];
  const b = state.grid[bIdx];
  if (a == null || b == null) return false;
  if (!areCellsConnectable(state, aIdx, bIdx)) return false;
  if (a === b) return true;
  if (a + b === 10) return true;
  return false;
}

function areCellsConnectable(state, aIdx, bIdx) {
  const cols = 9;
  const ai = aIdx % cols;
  const aj = Math.floor(aIdx / cols);
  const bi = bIdx % cols;
  const bj = Math.floor(bIdx / cols);

  const adjacent = Math.abs(ai - bi) + Math.abs(aj - bj) === 1;
  if (adjacent) return true;

  // row
  if (aj === bj) {
    const from = Math.min(ai, bi) + 1;
    const to = Math.max(ai, bi) - 1;
    for (let c = from; c <= to; c += 1) {
      const idx = aj * cols + c;
      if (state.grid[idx] != null) return false;
    }
    return true;
  }

  // column
  if (ai === bi) {
    const from = Math.min(aj, bj) + 1;
    const to = Math.max(aj, bj) - 1;
    for (let r = from; r <= to; r += 1) {
      const idx = r * cols + ai;
      if (state.grid[idx] != null) return false;
    }
    return true;
  }

  // next row
  const isRowBoundaryPair = ai === cols - 1 && bi === 0 && bj === aj + 1;
  const isRowBoundaryPairReverse = bi === cols - 1 && ai === 0 && aj === bj + 1;
  if (isRowBoundaryPair || isRowBoundaryPairReverse) return true;

  return false;
}

function scorePair(a, b) {
  if (a === 5 && b === 5) return 3;
  if (a === b) return 1;
  if (a + b === 10) return 2;
  return 0;
}

function applyPair(state, aIdx, bIdx) {
  const a = state.grid[aIdx];
  const b = state.grid[bIdx];
  const points = scorePair(a, b);
  if (points === 0) return false;
  state.lastMove = {
    type: "pair",
    aIdx,
    bIdx,
    a,
    b,
    prevScore: state.score,
  };
  state.grid[aIdx] = null;
  state.grid[bIdx] = null;
  state.score += points;
  state.movesMade += 1;
  return true;
}

function hasAnyMovesLeft(state) {
  return countValidMoves(state) > 0;
}

function hasAnyCells(state) {
  return !(state.grid.filter((x) => x != null).length === 0);
}

function hasAssistsLeft(state) {
  return (
    state.assists.addNumbersUsed < ASSIST_LIMITS.addNumbers ||
    state.assists.shuffleUsed < ASSIST_LIMITS.shuffle ||
    state.assists.eraserUsed < ASSIST_LIMITS.eraser
  );
}

function checkWin(state) {
  return state.score >= state.targetScore;
}

function checkLose(state) {
  if (state.rows >= 50) return true;
  if (!hasAnyMovesLeft(state) && !hasAssistsLeft(state)) return true;
  return false;
}

function checkDraw(state) {
  console.log(!hasAnyCells(state))
  return !hasAnyCells(state) && !hasAssistsLeft(state);
}

export {
  GAME_MODES,
  ASSIST_LIMITS,
  initGame,
  isPairValid,
  applyPair,
  checkWin,
  checkLose,
  checkDraw,
};
