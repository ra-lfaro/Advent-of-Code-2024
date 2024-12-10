/**
 * https://adventofcode.com/2024/day/10
 * Answer: 517
 */

import prepareInput from "./prepareInput";

type Position = [row: number, col: number];

const POSSIBLE_GRADIANTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const part1 = () => {

  const topoMap = prepareInput();

  const uniqueEnds = new Set<string>();

  const hike = (pos: Position, i: number): number => {

    const [r, c] = pos;

    if (
      r < 0 ||
      r >= topoMap.length ||
      c < 0 ||
      c >= topoMap[r].length ||
      topoMap[r][c] !== POSSIBLE_GRADIANTS[i]
    ) {
      return 0;
    }

    if (i === POSSIBLE_GRADIANTS.length - 1) {
      if (uniqueEnds.has(JSON.stringify(pos))) {
        return 0;
      }
      // we only care about unique ends
      uniqueEnds.add(JSON.stringify(pos));
      return 1;
    }

    let completeTrails = 0;

    completeTrails += hike(calculateNextStep(pos, 'up'), i + 1);
    completeTrails += hike(calculateNextStep(pos, 'down'), i + 1);
    completeTrails += hike(calculateNextStep(pos, 'left'), i + 1);
    completeTrails += hike(calculateNextStep(pos, 'right'), i + 1);

    return completeTrails;
  };

  let sumOfScores = 0;

  for (let r = 0; r < topoMap.length; r++) {
    for (let c = 0; c < topoMap[r].length; c++) {
      if (!topoMap[r][c]) {
        // starting point found

        const trailsFound = hike([r, c], 0)
        if (trailsFound > 0) {
          sumOfScores += trailsFound;
          uniqueEnds.clear()
        }

      }
    }
  }

  console.log('Answer:', sumOfScores);
  return sumOfScores;
};

type Direction = 'up' | 'down' | 'left' | 'right';
const calculateNextStep = (pos: Position, dir: Direction) => {
  const [r, c] = pos;
  const lookup: Record<Direction, Position> = {
    'up': [r - 1, c],
    'down': [r + 1, c],
    'left': [r, c - 1],
    'right': [r, c + 1]
  };
  return lookup[dir];
}

part1();