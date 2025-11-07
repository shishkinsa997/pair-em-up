import { el } from "./utils.js";

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

  const gameGrid = el("div", { className: "game__grid" });

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
  controls.append(restartBtn, saveBtn, continueBtn);

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

  app.append(startScreen, gameScreen);
  root.appendChild(app);

  // ux
}
