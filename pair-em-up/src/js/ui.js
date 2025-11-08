import { el, formatMs } from "./utils.js";
import { state, GAME_MODES } from "./constants.js";
import { initGame } from "./game.js";
import { startTimer, stopTimer } from "./timer.js";
export function buildUI(root) {
  const app = el("div", { id: "app" });

  // start screen
  const startScreen = el("main", {
    className: "start__screen main",
  });
  const startTitle = el("h1", {
    className: "start__title",
    text: "Pair 'em Up",
  });
  const startSubtutle = el("p", {
    className: "start__subtitle",
    text: "Pair 'em Up is a strategic number-matching puzzle game where players must clear a grid by finding and removing valid pairs of numbers.",
  });
  const github = el("a", {
    className: "start__gh",
    attrs: {
      href: "https://github.com/shishkinsa997",
      target: "_blank",
    },
    text: "GitHub: shishkinsa997",
  });

  const modeSection = el("div", {
    className: "mode-section",
  });
  const classicBtn = el("button", {
    className: "mode",
    attrs: { type: "button" },
    text: "Classic",
  });
  const randomBtn = el("button", {
    className: "mode",
    attrs: { type: "button" },
    text: "Random",
  });
  const chaoticBtn = el("button", {
    className: "mode",
    attrs: { type: "button" },
    text: "Chaotic",
  });

  const continueGameBtn = el("button", {
    className: "continue",
    attrs: { type: "button" },
    text: "Continue",
  });
  const settingsBtn = el("button", {
    className: "settings",
    attrs: { type: "button" },
    text: "Settings",
  });
  const scoreBtn = el("button", {
    className: "score",
    attrs: { type: "button" },
    text: "Results",
  });

  modeSection.append(classicBtn, randomBtn, chaoticBtn);
  startScreen.append(
    startTitle,
    startSubtutle,
    github,
    modeSection,
    continueGameBtn,
    settingsBtn,
    scoreBtn,
  );

  // game screen
  const gameScreen = el("main", {
    className: "game__screen main",
    attrs: { hidden: "" },
  });
  const modeTitle = el("h1", {
    className: "mode__title",
    text: "Classic",
  });
  const gameGrid = el("div", { className: "game__grid" });

  // hud
  const hud = el("div", { className: "hud" });
  const currentScore = el("p", {
    className: "current__score",
    text: "Current Score: 0",
  });
  const timer = el("p", {
    id: "timer",
    className: "timer",
    text: "Time: 00:00",
  });
  hud.append(currentScore, timer);

  // controls
  const controls = el("div", {
    className: "controls",
  });
  const restartBtn = el("button", {
    className: "restart",
    attrs: { type: "button" },
    text: "Restart",
  });
  const saveBtn = el("button", {
    className: "save",
    attrs: { type: "button" },
    text: "Save",
  });
  const continueBtn = el("button", {
    className: "continue",
    attrs: { type: "button" },
    text: "Continue",
  });
  const resultBtn = el("button", {
    className: "stat",
    attrs: { type: "button" },
    text: "Results",
  });
  controls.append(restartBtn, saveBtn, continueBtn, resultBtn);

  // helpers
  const helpers = el("div", {
    className: "helpers",
  });
  const hintsBtn = el("button", {
    className: "hints",
    attrs: { type: "button" },
    text: "Hints",
  });
  const revertBtn = el("button", {
    className: "revert",
    attrs: { type: "button" },
    text: "Revert",
  });
  const addNumbersBtn = el("button", {
    className: "add-numbers",
    attrs: { type: "button" },
    text: "Add Numbers",
  });
  const addNumbersCounter = el("span", {
    className: "btn__counter",
    text: "10",
  });
  addNumbersBtn.append(addNumbersCounter);
  const shuffleBtn = el("button", {
    className: "shuffle",
    id: "shuffle",
    attrs: { type: "button" },
    text: "Shuffle",
  });
  const shuffleCounter = el("span", {
    className: "btn__counter",
    text: "5",
  });
  shuffleBtn.append(shuffleCounter);
  const eraserBtn = el("button", {
    className: "eraser",
    id: "eraser",
    attrs: { type: "button" },
    text: "Eraser",
  });
  const eraserCounter = el("span", {
    className: "btn__counter",
    text: "5",
  });
  eraserBtn.append(eraserCounter);
  const hintsCounter = el("span", {
    className: "hints__counter",
    text: "0",
  });
  hintsBtn.append(hintsCounter);
  helpers.append(hintsBtn, revertBtn, addNumbersBtn, shuffleBtn, eraserBtn);

  gameScreen.append(modeTitle, hud, gameGrid, controls, helpers, settingsBtn);

  // result modal
  const resultModal = el("div", {
    className: "result__modal",
    attrs: { hidden: "" },
  });
  const resultText = el("p", { className: "result__text", text: "" });
  const resultScore = el("p", { className: "result__score", text: "" });
  const playAgain = el("button", {
    className: "play__again",
    attrs: { type: "button" },
    text: "Play Again",
  });
  const toMenu = el("button", {
    className: "to__menu",
    attrs: { type: "button" },
    text: "Main Menu",
  });
  resultModal.append(resultText, resultScore, playAgain, toMenu);

  // statistics modal
  const statModal = el("div", {
    className: "stat__modal",
    attrs: { hidden: "" },
  });
  const statTitle = el("h2", {
    className: "stat__title",
    text: "Latest 5 games (fastest first)",
  });
  const statList = el("ol", {
    className: "stat__list",
  });
  const closeStat = el("button", {
    className: "close__stat",
    attrs: { type: "button" },
    text: "Close",
  });
  statModal.append(statTitle, statList, closeStat);

  // settings modal
  const settingsModal = el("div", {
    className: "settings__modal",
    attrs: { hidden: "" },
  });
  const themeLabel = el("label", {
    text: "Theme: ",
  });
  const themeSelect = el("select", {
    id: "theme",
  });
  themeSelect.append(
    el("option", {
      attrs: { value: "light" },
      text: "Light",
    }),
  );
  themeSelect.append(
    el("option", {
      attrs: { value: "dark" },
      text: "Dark",
    }),
  );

  const soundLabel = el("label", {
    text: "Sound: ",
  });
  const soundToggle = el("input", {
    attrs: { type: "checkbox" },
  });
  const settingsSave = el("button", {
    text: "Save",
    attrs: { type: "button" },
  });
  const settingsClose = el("button", {
    text: "Close",
    attrs: { type: "button" },
  });
  themeLabel.append(themeSelect);
  soundLabel.append(soundToggle);
  settingsModal.append(themeLabel, soundLabel, settingsSave, settingsClose);

  app.append(settingsModal, resultModal, statModal);

  app.append(startScreen, gameScreen);
  root.appendChild(app);

  // ux
  function renderGrid() {
    gameGrid.textContent = "";
    const total = state.grid.length;
    const grid = el("div", {
      className: "cells",
      attrs: {
        role: "grid",
        style: "display:grid;grid-template-columns:repeat(9,1fr);",
      },
    });
    for (let i = 0; i < total; i++) {
      const val = state.grid[i] ?? null;

      const btn = el("button", {
        className: "cell",
        attrs: {
          "data-index": String(i),
          role: "gridcell",
          "aria-selected": state.selectedIndices.includes(i) ? "true" : "false",
          "aria-label": val != null ? `Cell ${val}` : "Empty cell",
        },
        text: val != null ? String(val) : "",
      });

      if (val == null) btn.setAttribute("disabled", "");
      if (state.selectedIndices.includes(i))
        btn.classList.add("cell--selected");
      grid.appendChild(btn);
    }
    gameGrid.appendChild(grid);
  }

  function showStart() {
    stopTimer();
    startScreen.removeAttribute("hidden");
    gameScreen.setAttribute("hidden", "");
  }
  function showGame() {
    startScreen.setAttribute("hidden", "");
    gameScreen.removeAttribute("hidden");
    startTimer();
    renderGrid();
  }

  // settings handlers
  applyTheme(themeSelect.value);

  settingsBtn.addEventListener("click", () => {
    settingsModal.toggleAttribute("hidden");
  });
  settingsClose.addEventListener("click", () => {
    settingsModal.setAttribute("hidden", "");
  });
  settingsSave.addEventListener("click", () => {
    const s = { theme: themeSelect.value, sound: !!soundToggle.checked };
    applyTheme(s.theme);
    settingsModal.setAttribute("hidden", "");
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
  }

  // buttons
  classicBtn.addEventListener("click", () => {
    initGame(state, GAME_MODES.CLASSIC);
    showGame();
  });
  randomBtn.addEventListener("click", () => {
    initGame(state, GAME_MODES.RANDOM);
    showGame();
  });
  chaoticBtn.addEventListener("click", () => {
    initGame(state, GAME_MODES.CHAOTIC);
    showGame();
  });
  continueGameBtn.addEventListener("click", () => {
    const saved = null;
    if (!saved) return;
    state.mode = saved.mode;
    state.grid = saved.grid;
    state.rows = Math.ceil(state.grid.length / 9);
    state.score = saved.score;
    state.targetScore = saved.targetScore;
    state.timerMs = saved.timerMs || 0;
    state.assists = saved.assists || state.assists;
    state.movesMade = saved.movesMade || 0;
    state.selectedIndices = [];
    showGame();
  });

  restartBtn.addEventListener("click", () => {
    initGame(state, state.mode);
    showGame();
  });
  saveBtn.addEventListener("click", () => {

  });
  continueGameBtn.addEventListener("click", () => {
    const saved = null;
    if (!saved) return;
    state.mode = saved.mode;
    state.grid = saved.grid;
    state.rows = Math.ceil(state.grid.length / 9);
    state.score = saved.score;
    state.targetScore = saved.targetScore;
    state.timerMs = saved.timerMs || 0;
    state.assists = saved.assists || state.assists;
    state.movesMade = saved.movesMade || 0;
    state.selectedIndices = [];
    renderGrid();
  });

  scoreBtn.addEventListener("click", () => {
    renderResults();
    statModal.removeAttribute("hidden");
  });
  closeStat.addEventListener("click", () => {
    statModal.setAttribute("hidden", "");
  });
  playAgain.addEventListener("click", () => {
    resultModal.setAttribute("hidden", "");
    initGame(state, state.mode);
    showGame();
  });
  toMenu.addEventListener("click", () => {
    resultModal.setAttribute("hidden", "");
    showStart();
  });

  resultBtn.addEventListener("click", () => {
    endGame(true);
  });

  function endGame(win) {
    stopTimer();
    state.running = false;
    resultText.textContent = win ? "You Win!" : "You Lose";
    resultScore.textContent = `Score: ${state.score} • Time: ${formatMs(state.timerMs)}`;
    resultModal.removeAttribute("hidden");
  }

  function renderResults() {
    const list = null;
    statList.textContent = "";
    list.forEach((r) => {
      const li = el("li", {
        html: `<strong>${r.win ? "Win" : "Loss"}</strong> • ${r.mode} • ${formatMs(r.timeMs)} • ${r.score} pts`,
      });
      statList.appendChild(li);
    });
    if (list.length === 0)
      statList.appendChild(el("li", { text: "No games yet" }));
  }

  showStart();
}
