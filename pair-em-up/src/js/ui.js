import { el, formatMs } from "./utils.js";
import { state, iconBtnSize, hintBtnSize, hintBtnColor } from "./constants.js";
import {
  GAME_MODES,
  initGame,
  isPairValid,
  applyPair,
  checkWin,
  checkLose,
} from "./game.js";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  saveSettings,
  loadSettings,
  saveResult,
  loadResults,
} from "./store.js";
import {
  revertLastMove,
  addNumbers,
  eraseAt,
  countValidMoves,
  shuffleBoard,
} from "./gameHelpers.js";
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

  const continueGameBtn = el("button", {
    className: "continue btn",
    attrs: { type: "button" },
    text: "Continue Game",
  });
  const newGameContainer = el("div", {
    className: "new-game-container",
  });
  const newGameTitle = el("p", {
    className: "new-game-title",
    text: "New Game",
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
  newGameContainer.append(newGameTitle, modeSection);
  modeSection.append(classicBtn, randomBtn, chaoticBtn);

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
      width="${iconBtnSize}"
      height="${iconBtnSize}"
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
      width="${iconBtnSize}"
      height="${iconBtnSize}"
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
        width="${iconBtnSize}" viewBox="0 0 20 20"
        height="${iconBtnSize}" fill="none"
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

  startFooter.append(github, scoreBtn, settingsBtn);
  startScreen.append(
    startTitle,
    startSubtutle,
    continueGameBtn,
    newGameContainer,
    startFooter,
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
  const settingsGameBtn = el("button", {
    className: "game__settings btn",
    attrs: { type: "button" },
    text: "Settings",
  });
  const resultBtn = el("button", {
    className: "stat btn",
    attrs: { type: "button" },
    text: "Results",
  });
  controls.append(restartBtn, saveBtn, continueBtn, resultBtn, settingsGameBtn);

  // helpers
  const helpers = el("div", {
    className: "helpers",
  });
  const hintsBtn = el("button", {
    className: "hints btn",
    attrs: { type: "button" },
    text: "Hints",
    html: `
      <svg width="${hintBtnSize}" height="${hintBtnSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z"
      stroke="${hintBtnColor}" stroke-width="2"/>
      <path d="M12 4V3" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 6L19 5" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M20 12H21" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 12H3" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M5 5L6 6" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 17H14" stroke="${hintBtnColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
  });
  const revertBtn = el("button", {
    className: "revert btn",
    attrs: { type: "button" },
    text: "Revert",
    html: `
      <svg width="${hintBtnSize}" height="${hintBtnSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.33929 4.46777H7.33929V7.02487C8.52931 6.08978 10.0299 5.53207 11.6607 5.53207C15.5267 5.53207 18.6607 8.66608 18.6607 12.5321C18.6607 16.3981 15.5267 19.5321 11.6607 19.5321C9.51025 19.5321 7.58625 18.5623 6.30219 17.0363L7.92151 15.8515C8.83741 16.8825 10.1732 17.5321 11.6607 17.5321C14.4222 17.5321 16.6607 15.2935 16.6607 12.5321C16.6607 9.77065 14.4222 7.53207 11.6607 7.53207C10.5739 7.53207 9.56805 7.87884 8.74779 8.46777L11.3393 8.46777V10.4678H5.33929V4.46777Z"
        fill="${hintBtnColor}"/>
      </svg>`,
  });
  const addNumbersBtn = el("button", {
    className: "add-numbers btn",
    attrs: { type: "button" },
    text: "Add Numbers",
    html: `
      <svg width="${hintBtnSize}" height="${hintBtnSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
        fill="${hintBtnColor}"/>
      </svg>`,
  });
  const addNumbersCounter = el("span", {
    className: "btn__counter",
    text: "10",
  });
  addNumbersBtn.append(addNumbersCounter);
  const shuffleBtn = el("button", {
    className: "shuffle icon-btn",
    id: "shuffle",
    attrs: { type: "button" },
    text: "Shuffle",
    html: `
      <svg width="${hintBtnSize}" height="${hintBtnSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.4697 9.46967C16.1768 9.76256 16.1768 10.2374 16.4697 10.5303C16.7626 10.8232 17.2374 10.8232 17.5303 10.5303L16.4697 9.46967ZM19.5303 8.53033C19.8232 8.23744 19.8232 7.76256 19.5303 7.46967C19.2374 7.17678 18.7626 7.17678 18.4697 7.46967L19.5303 8.53033ZM18.4697 8.53033C18.7626 8.82322 19.2374 8.82322 19.5303 8.53033C19.8232 8.23744 19.8232 7.76256 19.5303 7.46967L18.4697 8.53033ZM17.5303 5.46967C17.2374 5.17678 16.7626 5.17678 16.4697 5.46967C16.1768 5.76256 16.1768 6.23744 16.4697 6.53033L17.5303 5.46967ZM19 8.75C19.4142 8.75 19.75 8.41421 19.75 8C19.75 7.58579 19.4142 7.25 19 7.25V8.75ZM16.7 8L16.6993 8.75H16.7V8ZM12.518 10.252L13.1446 10.6642L13.1446 10.6642L12.518 10.252ZM10.7414 11.5878C10.5138 11.9338 10.6097 12.3989 10.9558 12.6266C11.3018 12.8542 11.7669 12.7583 11.9946 12.4122L10.7414 11.5878ZM11.9946 12.4122C12.2222 12.0662 12.1263 11.6011 11.7802 11.3734C11.4342 11.1458 10.9691 11.2417 10.7414 11.5878L11.9946 12.4122ZM10.218 13.748L9.59144 13.3358L9.59143 13.3358L10.218 13.748ZM6.041 16V16.75H6.04102L6.041 16ZM5 15.25C4.58579 15.25 4.25 15.5858 4.25 16C4.25 16.4142 4.58579 16.75 5 16.75V15.25ZM11.9946 11.5878C11.7669 11.2417 11.3018 11.1458 10.9558 11.3734C10.6097 11.6011 10.5138 12.0662 10.7414 12.4122L11.9946 11.5878ZM12.518 13.748L13.1446 13.3358L13.1446 13.3358L12.518 13.748ZM16.7 16V15.25H16.6993L16.7 16ZM19 16.75C19.4142 16.75 19.75 16.4142 19.75 16C19.75 15.5858 19.4142 15.25 19 15.25V16.75ZM10.7414 12.4122C10.9691 12.7583 11.4342 12.8542 11.7802 12.6266C12.1263 12.3989 12.2222 11.9338 11.9946 11.5878L10.7414 12.4122ZM10.218 10.252L9.59143 10.6642L9.59144 10.6642L10.218 10.252ZM6.041 8L6.04102 7.25H6.041V8ZM5 7.25C4.58579 7.25 4.25 7.58579 4.25 8C4.25 8.41421 4.58579 8.75 5 8.75V7.25ZM17.5303 13.4697C17.2374 13.1768 16.7626 13.1768 16.4697 13.4697C16.1768 13.7626 16.1768 14.2374 16.4697 14.5303L17.5303 13.4697ZM18.4697 16.5303C18.7626 16.8232 19.2374 16.8232 19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697L18.4697 16.5303ZM19.5303 16.5303C19.8232 16.2374 19.8232 15.7626 19.5303 15.4697C19.2374 15.1768 18.7626 15.1768 18.4697 15.4697L19.5303 16.5303ZM16.4697 17.4697C16.1768 17.7626 16.1768 18.2374 16.4697 18.5303C16.7626 18.8232 17.2374 18.8232 17.5303 18.5303L16.4697 17.4697ZM17.5303 10.5303L19.5303 8.53033L18.4697 7.46967L16.4697 9.46967L17.5303 10.5303ZM19.5303 7.46967L17.5303 5.46967L16.4697 6.53033L18.4697 8.53033L19.5303 7.46967ZM19 7.25H16.7V8.75H19V7.25ZM16.7007 7.25C14.7638 7.24812 12.956 8.22159 11.8914 9.8398L13.1446 10.6642C13.9314 9.46813 15.2676 8.74861 16.6993 8.75L16.7007 7.25ZM11.8914 9.83979L10.7414 11.5878L11.9946 12.4122L13.1446 10.6642L11.8914 9.83979ZM10.7414 11.5878L9.59144 13.3358L10.8446 14.1602L11.9946 12.4122L10.7414 11.5878ZM9.59143 13.3358C8.80541 14.5306 7.47115 15.25 6.04098 15.25L6.04102 16.75C7.97596 16.7499 9.78113 15.7767 10.8446 14.1602L9.59143 13.3358ZM6.041 15.25H5V16.75H6.041V15.25ZM10.7414 12.4122L11.8914 14.1602L13.1446 13.3358L11.9946 11.5878L10.7414 12.4122ZM11.8914 14.1602C12.956 15.7784 14.7638 16.7519 16.7007 16.75L16.6993 15.25C15.2676 15.2514 13.9314 14.5319 13.1446 13.3358L11.8914 14.1602ZM16.7 16.75H19V15.25H16.7V16.75ZM11.9946 11.5878L10.8446 9.83979L9.59144 10.6642L10.7414 12.4122L11.9946 11.5878ZM10.8446 9.8398C9.78113 8.2233 7.97596 7.25005 6.04102 7.25L6.04098 8.75C7.47115 8.75004 8.80541 9.46939 9.59143 10.6642L10.8446 9.8398ZM6.041 7.25H5V8.75H6.041V7.25ZM16.4697 14.5303L18.4697 16.5303L19.5303 15.4697L17.5303 13.4697L16.4697 14.5303ZM18.4697 15.4697L16.4697 17.4697L17.5303 18.5303L19.5303 16.5303L18.4697 15.4697Z"
        fill="${hintBtnColor}"/>
      </svg>`,
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
    html: `
    <svg width="${hintBtnSize}" height="${hintBtnSize}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.49997 12.8995C2.71892 13.6805 2.71892 14.9468 3.49997 15.7279L7.35785 19.5858H4.08576C3.53347 19.5858 3.08576 20.0335 3.08576 20.5858C3.08576 21.1381 3.53347 21.5858 4.08576 21.5858H20.0858C20.638 21.5858 21.0858 21.1381 21.0858 20.5858C21.0858 20.0335 20.638 19.5858 20.0858 19.5858H10.9558L20.4705 10.071C21.2516 9.28999 21.2516 8.02366 20.4705 7.24261L16.2279 2.99997C15.4468 2.21892 14.1805 2.21892 13.3995 2.99997L3.49997 12.8995ZM7.82579 11.4021L4.91418 14.3137L9.15683 18.5563L12.0684 15.6447L7.82579 11.4021ZM9.24 9.98787L13.4826 14.2305L19.0563 8.65683L14.8137 4.41418L9.24 9.98787Z"
      fill="${hintBtnColor}"/>
    </svg>`,
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

  gameContainer.append(modeTitle, hud, gameGrid, helpers, controls);
  gameScreen.append(gameContainer);

  // result modal
  const resultModal = el("div", {
    className: "result__modal",
    attrs: { hidden: "" },
  });
  const resultContainer = el("div", {
    className: "result__container modal-container",
  })
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
  resultContainer.append(resultText, resultScore, playAgain, toMenu);
  resultModal.append(resultContainer);

  // statistics modal
  const statModal = el("div", {
    className: "stat__modal",
    attrs: { hidden: "" },
  });
  const statContainer = el("div", {
    className: "stat__container modal-container",
  })
  const statTitle = el("h2", {
    className: "stat__title",
    text: "Latest 5 games (fastest first)",
  });
  const statList = el("ol", {
    className: "stat__list stat__inner-container",
  });
  const closeStat = el("button", {
    className: "close__stat btn",
    attrs: { type: "button" },
    text: "Close",
  });
  statContainer.append(statTitle, statList, closeStat);
  statModal.append(statContainer);

  // settings modal
  const settingsModal = el("div", {
    className: "settings__modal",
    attrs: { hidden: "" },
  });
  const settingsContainer = el("div", {
    className: "settings__container modal-container",
  });
  const themeLabel = el("label", {
    className: "settings__inner-container",
    text: "Theme: ",
  });
  const themeToggle = el("div", {
    className: "settings__theme",
  });
  const themeInput = el("input", {
    id: "theme",
    attrs: { type: "checkbox", checked: "checked" },
  });
  const themeMark = el("div", {
    className: "settings__sound-mark",
  });
  themeToggle.append(themeInput, themeMark);

  const soundLabel = el("label", {
    className: "settings__inner-container",
    text: "Sound: ",
  });
  const soundToggle = el("div", {
    className: "settings__sound",
  });
  const soundInput = el("input", {
    attrs: { type: "checkbox", checked: "checked" },
  });
  const soundMark = el("div", {
    className: "settings__sound-mark",
  });
  soundToggle.append(soundInput, soundMark);

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
  const settingsBtnContainer = el("div", {
    className: "settings__btn-container",
  })
  themeLabel.append(themeToggle);
  soundLabel.append(soundToggle);
  settingsBtnContainer.append(settingsSave, settingsClose);
  settingsContainer.append(
    themeLabel,
    soundLabel,
    settingsBtnContainer,
  );
  settingsModal.append(settingsContainer);

  app.append(settingsModal, resultModal, statModal);

  app.append(startScreen, gameScreen);
  root.appendChild(app);

  // ux
  function renderGrid() {
    gameGrid.textContent = "";
    let total = state.grid.length;
    if (total < 63) total = 63;
    total += 9 - (total - 9 * Math.floor(total / 9)) + 9;
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
      btn.addEventListener("click", () => onCellClick(i));
      grid.appendChild(btn);
    }
    console.log(total);
    gameGrid.appendChild(grid);
  }

  function updateHud() {
    currentScore.textContent = `Current Score: ${state.score}`;
    // hints
    const available = countValidMoves(state);
    hintsCounter.textContent = String(available);
    modeTitle.textContent =
      state.mode.charAt(0).toUpperCase() + state.mode.slice(1);
    const addLeft = Math.max(0, 10 - state.assists.addNumbersUsed);
    const shLeft = Math.max(0, 5 - state.assists.shuffleUsed);
    const erLeft = Math.max(0, 5 - state.assists.eraserUsed);
    addNumbersCounter.textContent = String(addLeft);
    shuffleCounter.textContent = String(shLeft);
    eraserCounter.textContent = String(erLeft);
    if (addLeft === 0) addNumbersBtn.setAttribute("disabled", "");
    else addNumbersBtn.removeAttribute("disabled");
    if (shLeft === 0) shuffleBtn.setAttribute("disabled", "");
    else shuffleBtn.removeAttribute("disabled");
    if (erLeft === 0) eraserBtn.setAttribute("disabled", "");
    else eraserBtn.removeAttribute("disabled");
  }

  function showStart() {
    stopTimer();
    startScreen.removeAttribute("hidden");
    gameScreen.setAttribute("hidden", "");
    const saved = loadFromLocalStorage();
    if (saved) {
      continueGameBtn.removeAttribute("disabled");
    } else {
      continueGameBtn.setAttribute("disabled", "");
    }
  }
  function showGame() {
    continueBtn.classList.add("game__continue");
    startScreen.setAttribute("hidden", "");
    gameScreen.removeAttribute("hidden");
    startTimer();
    renderGrid();
    updateHud();
  }

  // settings handlers
  const currentSettings = loadSettings();
  applyTheme(currentSettings.theme);
  // themeSelect.value = currentSettings.theme;
  themeToggle.checked = !!currentSettings.theme;
  soundToggle.checked = !!currentSettings.sound;

  settingsBtn.addEventListener("click", () => {
    settingsModal.toggleAttribute("hidden");
  });
  settingsGameBtn.addEventListener("click", () => {
    settingsModal.toggleAttribute("hidden");
  });
  settingsClose.addEventListener("click", () => {
    settingsModal.setAttribute("hidden", "");
  });
  const themeId = document.getElementById('theme');
  settingsSave.addEventListener("click", () => {
    const s = { theme: !!themeId.checked, sound: !!soundToggle.checked };
    saveSettings(s);
    applyTheme(s.theme);
  });
  function applyTheme(theme) {
    const themeClass = theme ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeClass);
  }

  function onCellClick(idx) {
    const val = state.grid[idx];
    if (val == null) return;
    const sel = state.selectedIndices;
    const pos = sel.indexOf(idx);
    if (pos >= 0) {
      sel.splice(pos, 1);
    } else {
      if (sel.length >= 2) sel.length = 0;
      sel.push(idx);
      if (sel.length === 2) {
        const [a, b] = sel;
        if (isPairValid(state, a, b) && applyPair(state, a, b)) {
          sel.length = 0;
          renderGrid();
          updateHud();
          if (checkWin(state)) endGame(true);
          else if (checkLose(state)) endGame(false);
          return;
        }
      }
    }
    renderGrid();
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
    const saved = loadFromLocalStorage();
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
    saveToLocalStorage(state);
  });
  continueGameBtn.addEventListener("click", () => {
    const saved = loadFromLocalStorage();
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
    updateHud();
  });

  hintsBtn.addEventListener("click", () => {
    updateHud();
  });
  revertBtn.addEventListener("click", () => {
    if (revertLastMove(state)) {
      renderGrid();
      updateHud();
    }
  });
  addNumbersBtn.addEventListener("click", () => {
    if (addNumbers(state)) {
      renderGrid();
      updateHud();
    }
  });
  shuffleBtn.addEventListener("click", () => {
    if (shuffleBoard(state)) {
      renderGrid();
      updateHud();
    }
  });
  eraserBtn.addEventListener("click", () => {
    const handler = (e) => {
      const elCell = e.target.closest(".cell");
      if (!elCell) return;
      const idx = Number(elCell.getAttribute("data-index"));
      if (eraseAt(state, idx)) {
        document.removeEventListener("click", handler, true);
        renderGrid();
        updateHud();
      } else {
        document.removeEventListener("click", handler, true);
      }
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("click", handler, true);
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
    saveResult({
      mode: state.mode,
      score: state.score,
      timeMs: state.timerMs,
      win: !!win,
      moves: state.movesMade,
      at: Date.now(),
    });
  }

  function renderResults() {
    const list = loadResults();
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
