/**
 * https://adventofcode.com/2024/day/6
 * Answer:
 */

import prepareInput from "./prepareInput";

type Position = [r: number, c: number];
type Direction = 'up' | 'down' | 'left' | 'right';


const part2 = async () => {
  const map = await prepareInput();
  const start = findStart(map);

  // first lets get original path
  const [, originalPath] = traverseMap(map, start);
  // we cant place one at the starting position so skip that entry
  originalPath.delete(JSON.stringify(start));

  let potentialLoops = 0;

  // only placeing a potential object on parts of the path or else the gaurd will never hit it.
  for (const positionString of originalPath) {
    const pos = JSON.parse(positionString) as Position;
    const [hasLoop] = traverseMap(map, start, pos)

    if (hasLoop)
      potentialLoops++;

  }

  console.log('Answer:', potentialLoops);
  return potentialLoops;
}

const traverseMap = (map: string[][], start: Position, optionalObstruction?: Position): [boolean, Set<string>] => {
  let currPosition = start;
  let currDirection: Direction = 'up';
  let escaped = false;

  const positionsSeen = new Set<string>();
  positionsSeen.add(JSON.stringify(currPosition))

  const pathTraversed = new Set<string>();
  pathTraversed.add(JSON.stringify(currPosition) + currDirection);

  while (!escaped) {

    // look ahead at next step
    let [nextRow, nextCol] = stepForward(currPosition, currDirection);

    //if next step is outside were done
    if (hasEscaped([nextRow, nextCol], map.length, map[0].length)) {
      escaped = true
      continue;
    }

    // if next step is an obstruction change direction
    if (
      map[nextRow][nextCol] === '#' ||
      (
        optionalObstruction?.[0] === nextRow &&
        optionalObstruction?.[1] === nextCol
      )
    ) {
      currDirection = turnRight90(currDirection);
      continue;
    }

    // if its clear take next step
    currPosition = [nextRow, nextCol];
    positionsSeen.add(JSON.stringify(currPosition));

    // if we've been on this spot facing the same direction as before we know its a loop
    if (pathTraversed.has(JSON.stringify(currPosition) + currDirection)) {
      return [true, positionsSeen];
    }
    // otherwise add it and keep moving
    pathTraversed.add(JSON.stringify(currPosition) + currDirection)
  }

  // now that we know the path we know we have to obstruct somewhere on the path.
  return [false, positionsSeen];
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


part2();