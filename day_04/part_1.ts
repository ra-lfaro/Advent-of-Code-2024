/**
 * https://adventofcode.com/2024/day/4
 * Answer: 2434
 */

import prepareInput from "./prepareInput";

const SEEKED_WORD = 'XMAS';
type Coord = [r: number, c: number];
type Direction = 'topLeft' | 'top' | 'topRight' | 'left' | 'right' | 'bottomLeft' | 'bottom' | 'bottomRight'

const search = () => {

  // get the matrix to search
  const wordSearch = prepareInput();

  // we can start everywhere theres an X to cut down some iterations
  const potentialStarts = gatherPotentialStarts(wordSearch);

  const dfs = (i: number, r: number, c: number, direction?: Direction): number => {

    // If not in bounds cant be correct
    // if the current letter doesnt match the letter we seek we can stop aswell
    if (
      r >= wordSearch.length ||
      r < 0 ||
      c >= wordSearch[r].length ||
      c < 0 ||
      wordSearch[r][c] !== SEEKED_WORD[i]
    ) {
      return 0;
    }

    // we've matched all the letters
    if (i === SEEKED_WORD.length - 1) {
      return 1;
    }


    // check all the directions for next letter if its start, otherwise just go in the direction youre already going
    let found = 0;

    if (!direction) {
      // we can have multiple matches from the same starting letter
      found += dfs(i + 1, ...getDirectionCoords('topLeft', r, c), 'topLeft');
      found += dfs(i + 1, ...getDirectionCoords('top', r, c), 'top');
      found += dfs(i + 1, ...getDirectionCoords('topRight', r, c), 'topRight');
      found += dfs(i + 1, ...getDirectionCoords('left', r, c), 'left');
      found += dfs(i + 1, ...getDirectionCoords('right', r, c), 'right');
      found += dfs(i + 1, ...getDirectionCoords('bottomLeft', r, c), 'bottomLeft');
      found += dfs(i + 1, ...getDirectionCoords('bottom', r, c), 'bottom');
      found += dfs(i + 1, ...getDirectionCoords('bottomRight', r, c), 'bottomRight');
    } else {
      found += dfs(i + 1, ...getDirectionCoords(direction, r, c), direction)
    }

    return found;
  }


  let matchesFound = 0;
  for (let [r, c] of potentialStarts) {
    matchesFound += dfs(0, r, c);
  }

  console.log('Answer:', matchesFound);
  return matchesFound;
};

const getDirectionCoords = (dir: Direction, r: number, c: number) => {
  const lookup: Record<Direction, Coord> = {
    'topLeft': [r - 1, c - 1],
    'top': [r - 1, c],
    'topRight': [r - 1, c + 1],

    'left': [r, c - 1],
    'right': [r, c + 1],

    'bottomLeft': [r + 1, c - 1],
    'bottom': [r + 1, c],
    'bottomRight': [r + 1, c + 1]
  }

  return lookup[dir];
}

const gatherPotentialStarts = (wordSearch: string[][]) => {
  const potentialStarts: Coord[] = [];

  for (let r = 0; r < wordSearch.length; r++) {
    for (let c = 0; c < wordSearch[r].length; c++) {
      if (wordSearch[r][c] === SEEKED_WORD[0])
        potentialStarts.push([r, c]);
    }
  }

  return potentialStarts;
};

search();