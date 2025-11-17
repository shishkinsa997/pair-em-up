const GAME_MODES = {
  CLASSIC: "classic",
  RANDOM: "random",
  CHAOTIC: "chaotic",
};

const ASSIST_LIMITS = {
  addNumbers: 10,
  shuffle: 5,
  eraser: 5,
};

const state = {
  mode: GAME_MODES.CLASSIC,
  grid: [],
  rows: 0,
  score: 0,
  targetScore: 100,
  selectedIndices: [],
  timerMs: 0,
  running: false,
  lastMove: null,
  assists: {
    addNumbersUsed: 0,
    shuffleUsed: 0,
    eraserUsed: 0,
  },
  movesMade: 0,
};

const tState = {
  currentTutorialStep: 0,
  grid: [],
  selectedIndices: [],
  score: 0,
};

const iconBtnSize = '2rem'
const hintBtnSize = '1.7rem'
const svgColor = '#fff'

export { state, GAME_MODES, ASSIST_LIMITS, iconBtnSize, hintBtnSize, svgColor, tState };
