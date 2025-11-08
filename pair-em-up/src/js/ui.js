import { el, formatMs } from "./utils.js";
import { state } from "./constants.js";
import {
  GAME_MODES,
  initGame,
} from "./game.js";
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

  const modeSection = el("div", {
    className: "mode-section",
  });
  const classicBtn = el("button", {
    className: "mode btn",
    attrs: { type: "button" },
    text: "Classic",
  });
  const randomBtn = el("button", {
    className: "mode btn",
    attrs: { type: "button" },
    text: "Random",
  });
  const chaoticBtn = el("button", {
    className: "mode btn",
    attrs: { type: "button" },
    text: "Chaotic",
  });

  const continueGameBtn = el("button", {
    className: "continue btn",
    attrs: { type: "button" },
    text: "Continue",
  });
  const startFooter = el("div", {
    className: "start-footer",
  });
  const github = el("a", {
    className: "github btn",
    attrs: {
      href: "https://github.com/shishkinsa997",
      target: "_blank",
    },
    html: `
    <svg
      width="5rem"
      height="5rem"
      fill="#0092E4"
      xmlns="http://www.w3.org/2000/svg"
      data-name="github-logo"
      viewBox="0 0 24 24" id="github">
      <path d="M12,2.2467A10.00042,10.00042,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z"></path>
    </svg>`,
  });
  const scoreBtn = el("button", {
    className: "score btn",
    attrs: { type: "button" },
    html: `
    <svg
      fill="#0092E4"
      width="5rem"
      height="5rem"
      viewBox="0 0 32 32"
      id="icon"
      xmlns="http://www.w3.org/2000/svg">
      <defs>
    <style> .cls-1 {fill: none;}</style>
    </defs>
    <rect x="13.9999" y="23" width="8" height="2"/>
    <rect x="9.9999" y="23" width="2" height="2"/>
    <rect x="13.9999" y="18" width="8" height="2"/>
    <rect x="9.9999" y="18" width="2" height="2"/>
    <rect x="13.9999" y="13" width="8" height="2"/>
    <rect x="9.9999" y="13" width="2" height="2"/>
    <path d="M25,5H22V4a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2V5H7A2,2,0,0,0,5,7V28a2,2,0,0,0,2,2H25a2,2,0,0,0,2-2V7A2,2,0,0,0,25,5ZM12,4h8V8H12ZM25,28H7V7h3v3H22V7h3Z" transform="translate(0 0)"/>
    <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
    </svg>`,
  });
  const settingsBtn = el("button", {
    className: "settings btn",
    attrs: { type: "button" },
    html: `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5rem" viewBox="0 0 20 20"
        height="5rem" fill="none"
        class="svg-icon">
        <g
          stroke-width="1.5"
          stroke-linecap="round"
          stroke="#0092E4">
        <circle r="2.5" cy="10" cx="10"></circle>
        <path fill-rule="evenodd" d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z"
          clip-rule="evenodd">
        </path>
        </g>
      </svg>`,
  });

  modeSection.append(classicBtn, randomBtn, chaoticBtn);
  startFooter.append(github, scoreBtn, settingsBtn);
  startScreen.append(
    startTitle,
    startSubtutle,
    continueGameBtn,
    modeSection,
    startFooter,
  );
  startScreen.appendChild(settingsBtn);

  // game screen
  const gameScreen = el("main", {
    className: "game__screen main",
    attrs: { hidden: "" },
  });
  const modeTitle = el("h1", {
    className: "mode__title",
    text: "Classic",
  });
  const gameContainer = el("div", {
    className: "game__container",
  });
  const gameGrid = el("div", {
    className: "game__grid",
  });

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
    className: "restart btn",
    attrs: { type: "button" },
    text: "Restart",
  });
  const saveBtn = el("button", {
    className: "save btn",
    attrs: { type: "button" },
    text: "Save",
  });
  const continueBtn = el("button", {
    className: "continue btn",
    attrs: { type: "button" },
    text: "Continue",
  });
  const resultBtn = el("button", {
    className: "stat btn",
    attrs: { type: "button" },
    text: "Results",
  });
  controls.append(restartBtn, saveBtn, continueBtn, resultBtn, settingsBtn);

  // helpers
  const helpers = el("div", {
    className: "helpers",
  });
  const hintsBtn = el("button", {
    className: "hints btn",
    attrs: { type: "button" },
    text: "Hints",
  });
  const revertBtn = el("button", {
    className: "revert btn",
    attrs: { type: "button" },
    text: "Revert",
  });
  const addNumbersBtn = el("button", {
    className: "add-numbers btn",
    attrs: { type: "button" },
    text: "Add Numbers",
  });
  const addNumbersCounter = el("span", {
    className: "btn__counter",
    text: "10",
  });
  addNumbersBtn.append(addNumbersCounter);
  const shuffleBtn = el("button", {
    className: "shuffle btn",
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
    className: "eraser btn",
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

  gameContainer.append(modeTitle, hud, gameGrid, controls, helpers);
  gameContainer.appendChild(settingsBtn);
  gameScreen.append(gameContainer);

  // result modal
  const resultModal = el("div", {
    className: "result__modal",
    attrs: { hidden: "" },
  });
  const resultText = el("p", { className: "result__text", text: "" });
  const resultScore = el("p", { className: "result__score", text: "" });
  const playAgain = el("button", {
    className: "play__again  btn",
    attrs: { type: "button" },
    text: "Play Again",
  });
  const toMenu = el("button", {
    className: "to__menu  btn",
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
    className: "close__stat btn",
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
    className: "settings__save btn",
    text: "Save",
    attrs: { type: "button" },
  });
  const settingsClose = el("button", {
    className: "settings__close btn",
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
    startFooter.append(settingsBtn);
    startScreen.removeAttribute("hidden");
    gameScreen.setAttribute("hidden", "");
  }
  function showGame() {
    gameScreen.appendChild(settingsBtn);
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
