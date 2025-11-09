import { isPairValid } from "./game";

function countValidMoves(state) {
  const filled = [];
  for (let i = 0; i < state.grid.length; i += 1)
    if (state.grid[i] != null) filled.push(i);
  let cnt = 0;
  for (let i = 0; i < filled.length; i += 1) {
    for (let j = i + 1; j < filled.length; j += 1) {
      if (isPairValid(state, filled[i], filled[j])) cnt += 1;
      if (cnt >= 5) return 5;
    }
  }
  return cnt;
}

export { countValidMoves };