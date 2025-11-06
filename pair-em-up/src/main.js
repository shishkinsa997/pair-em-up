import "./styles/main.scss";
import "./styles/media.scss";
import { buildUI } from "./js/ui.js";

document.addEventListener("DOMContentLoaded", () => {
  buildUI(document.body);
});
