import { el } from "./util.js";
// import { state } from "./constants.js";

export function buildUI(root) {
  // container
  const app = el("div", { id: "app" });

  //start screen
  const startScreen = el("main", { className: "start__screen main" });
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
    attrs: { href: "https://github.com/shishkinsa997", target: "_blank" },
    text: "GitHub: shishkinsa997",
  });

  const modeSection = el("div", {
    className: "mode-section",
  });
  const classic = el("button", {
    className: "mode",
    id: "classic",
    attrs: { type: "button" },
    text: "Classic",
  });
  const random = el("button", {
    className: "mode",
    id: "random",
    attrs: { type: "button" },
    text: "Random",
  });
  const chaotic = el("button", {
    className: "mode",
    id: "chaotic",
    attrs: { type: "button" },
    text: "Chaotic",
  });

  const continueGame = el("button", {
    className: "continue",
    id: "continue",
    attrs: { type: "button" },
    text: "Continue",
  });

  const settings = el("button", {
    className: "settings",
    id: "settings",
    attrs: { type: "button" },
    text: "Settings",
  });

  const score = el("button", {
    className: "score",
    id: "score",
    attrs: { type: "button" },
    text: "Score",
  });

  modeSection.append(classic, random, chaotic);
  startScreen.append(
    startTitle,
    startSubtutle,
    github,
    modeSection,
    continueGame,
    settings,
    score,
  );

  //game screen
  const gameScreen = el("main", { className: "game__screen main" });
  const modeTitle = el("h1", {
    className: "mode__title",
    text: "Classic",
  });

  const gameGrid = el("div", { className: "game__grid" });

  const currentScore = el("p", {
    className: "current__score",
    text: "Current Score: 0",
  });
  const timer = el("p", {
    className: "timer",
    text: "Time: 0",
  });
  const controls = el("div", { className: "controls" });
  const restart = el("button", {
    className: "restart",
    id: "restart",
    attrs: { type: "button" },
    text: "Restart",
  });
  const save = el("button", {
    className: "save",
    id: "save",
    attrs: { type: "button" },
    text: "Save",
  });

  const helpers = el("div", { className: "helpers" });
  const hints = el("button", {
    className: "hints",
    id: "hints",
    attrs: { type: "button" },
    text: "Hints",
  });
  const revert = el("button", {
    className: "revert",
    id: "revert",
    attrs: { type: "button" },
    text: "Revert",
  });
  const addNumbers = el("button", {
    className: "add-numbers",
    id: "add-numbers",
    attrs: { type: "button" },
    text: "Add Numbers",
  });
  const shuffle = el("button", {
    className: "shuffle",
    id: "shuffle",
    attrs: { type: "button" },
    text: "Shuffle",
  });
  const eraser = el("button", {
    className: "eraser",
    id: "eraser",
    attrs: { type: "button" },
    text: "Eraser",
  });
  helpers.append(hints, revert, addNumbers, shuffle, eraser);
  controls.append(restart, save, continueGame);
  gameScreen.append(modeTitle, gameGrid, currentScore, timer, controls, helpers, settings);

  app.appendChild(gameScreen);
  root.appendChild(app);
}
