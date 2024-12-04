/**
 * https://adventofcode.com/2024/day/4
 * Answer: 1835
 */

import prepareInput from "./prepareInput";

const SEEKED_WORD = 'MAS';
type Coord = [r: number, c: number];
type Direction = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

const search = async () => {

  // get the matrix to search
  const wordSearch = await prepareInput();

  // we can start everywhere theres an M to cut down some iterations
  const potentialStarts = gatherPotentialStarts(wordSearch);

  const matchedACoords: Record<string, number> = {};

  const dfs = (i: number, r: number, c: number, path: Coord[], direction?: Direction) => {

    // If not in bounds cant be correct
    // if the current letter doesnt match the letter we seek we can stop aswell
    if (
      r >= wordSearch.length ||
      r < 0 ||
      c >= wordSearch[r].length ||
      c < 0 ||
      wordSearch[r][c] !== SEEKED_WORD[i]
    ) {
      return;
    }

    // we know the current spot is still valid so record it to path
    path.push([r, c])

    // we've matched all the letters so lets record where the A was and how many times it was used
    if (i === SEEKED_WORD.length - 1) {
      // matched paths will always be length 3 so the A will always be index 1
      const positionOfA = path[1];
      const [aR, aC] = positionOfA;
      matchedACoords[`${aR}-${aC}`] = (matchedACoords[`${aR}-${aC}`] ?? 0) + 1;
      return;
    }

    if (!direction) {
      // we can have multiple matches from the same starting letter
      // we only need to check diagonal directions 
      dfs(i + 1, ...getDirectionCoords('topLeft', r, c), [...path], 'topLeft');
      dfs(i + 1, ...getDirectionCoords('topRight', r, c), [...path], 'topRight');
      dfs(i + 1, ...getDirectionCoords('bottomLeft', r, c), [...path], 'bottomLeft');
      dfs(i + 1, ...getDirectionCoords('bottomRight', r, c), [...path], 'bottomRight');
    } else {
      dfs(i + 1, ...getDirectionCoords(direction, r, c), [...path], direction)
    }

  }

  // check all potential matches
  for (let [r, c] of potentialStarts) {
    dfs(0, r, c, []);
  }


  // anywhere the are two instances of matched A's on the same coords we know there was an intersection there
  const foundIntersections = Object.values(matchedACoords).filter(val => val === 2).length;

  console.log('Answer:', foundIntersections);
  return foundIntersections;
};

const getDirectionCoords = (dir: Direction, r: number, c: number) => {
  const lookup: Record<Direction, Coord> = {
    'topLeft': [r - 1, c - 1],
    'topRight': [r - 1, c + 1],

    'bottomLeft': [r + 1, c - 1],
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