/**
 * https://adventofcode.com/2024/day/6
 * Answer: 4826
 */

import prepareInput from "./prepareInput";

type Position = [r: number, c: number];
type Direction = 'up' | 'down' | 'left' | 'right';

const part1 = async () => {

  const map = await prepareInput();
  let currPosition = findStart(map);
  let currDirection: Direction = 'up';
  let escaped = false;

  const positionsSeen = new Set<string>();
  positionsSeen.add(JSON.stringify(currPosition))

  while (!escaped) {

    // look ahead at next step
    let [nextRow, nextCol] = stepForward(currPosition, currDirection);

    //if next step is outside were done
    if (hasEscaped([nextRow, nextCol], map.length, map[0].length)) {
      escaped = true
      continue;
    }

    // if next step is an obstruction change turn
    if (map[nextRow][nextCol] === '#') {
      currDirection = turnRight90(currDirection);
      continue;
    }

    // if its clear take next step
    currPosition = [nextRow, nextCol];
    positionsSeen.add(JSON.stringify(currPosition));

  }

  console.log('Answer:', positionsSeen.size);
  return positionsSeen.size;
};


const findStart = (map: string[][]): Position => {
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      if (map[r][c] === '^')
        return [r, c]
    }
  }
  // should never happen but cleans up types
  return [0, 0]
};

const stepForward = (pos: Position, dir: Direction) => {
  const [r, c] = pos;

  const progressionLookup: Record<Direction, Position> = {
    'up': [r - 1, c],
    'right': [r, c + 1],
    'down': [r + 1, c],
    'left': [r, c - 1]
  };

  return progressionLookup[dir];
};

const turnRight90 = (dir: Direction) => {
  const turnLookup: Record<Direction, Direction> = {
    'up': 'right',
    'right': 'down',
    'down': 'left',
    'left': 'up'
  };

  return turnLookup[dir];
};

const hasEscaped = (pos: Position, width: number, height: number) => {
  const [r, c] = pos;

  return (r === height || r < 0 || c === width || c < 0)
};


part1();