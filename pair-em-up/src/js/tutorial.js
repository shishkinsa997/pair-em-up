function isTutorialPairValid(state, aIdx, bIdx) {
  if (aIdx === bIdx) return false;
  const a = state.grid[aIdx];
  const b = state.grid[bIdx];
  if (a == null || b == null) return false;

  if (!areTutorialCellsConnectable(state, aIdx, bIdx)) return false;

  // if (step.title.includes("Match Numbers")) {
  //   return a === b;
  // } else if (step.title.includes("Make 10")) {
  //   return a + b === 10;
  // } else if (step.title.includes("Bonus Pair")) {
  //   return a === 5 && b === 5;
  // } else if (step.title.includes("Connectivity")) {
  //   return a === b;
  // } else if (step.title.includes("Empty Cells Stay")) {
  //   return a === b || a + b === 10;
  // }

  return a === b || a + b === 10;
}

function areTutorialCellsConnectable(state, aIdx, bIdx) {
  const cols = 3;
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
  if (aj - bj === 1) {
    for (let i = bIdx + 1; i < aIdx; i += 1) {
      if (state.grid[i] != null) return false;
    }
    return true;
  }
  if (bj - aj === 1) {
    for (let i = aIdx + 1; i < bIdx; i += 1) {
      if (state.grid[i] != null) return false;
    }
    return true;
  }
  return false;
}

const tutorialSteps = [
  {
    title: "Step 1 — Match Numbers",
    description: "Connect two identical numbers\nto remove them from the field",
    instruction: "Try to pick any two identical numbers",
    grid: [3, 3, 8, 1, 5, 6, 2, 7, 6],
    demoComplete: false,
  },
  {
    title: "Step 2 — Make 10",
    description: "Pair is valid, if sum of numbers is 10",
    instruction: "Find a pair that adds up to 10 (e.g. 4 + 6)",
    grid: [4, 6, 7, 2, 1, 9, 8, 2, 1],
    demoComplete: false,
  },
  {
    title: "Step 3 — Bonus Pair",
    description:
      "Points are awarded based on pair difficulty\nIdentical pair: +1 point\nSum-to-10 pair: +2 points",
    instruction: "Special case:\npair of fives awards bonus points +3 points",
    grid: [2, 5, 5, 8, 8, 6, 2, 6, 4],
    demoComplete: false,
  },
  {
    title: "Step 4 — Connectivity",
    description:
      "Pair can be made if numbers are:\nNext to each other\nIn a line without obstacles\nStand at the border of rows",
    instruction: "Try to create a pair using any combination of cells",
    grid: [1, 5, 1, 9, 9, 7, 7, 5, 8],
    demoComplete: false,
  },
  {
    title: "Step 5 — Empty Cells Stay",
    description:
      "When the pair disappears,\nempty cells remain and numbers do not shift",
    instruction: "Try to score as many points as possible",
    grid: [6, 7, 5, 3, 7, 9, 1, 7, 5],
    demoComplete: false,
  },
  {
    title: "Step 6 — Your Goal",
    description:
      "Clear the field,\ncollect pairs and score 100+ poins\nwhile moves are available",
    instruction: "If you clear the field of numbers, it will be a draw",
    grid: ['y', null, null, null, null, null, null, null, null],
    demoComplete: false,
  },
];

export { isTutorialPairValid, areTutorialCellsConnectable, tutorialSteps };
