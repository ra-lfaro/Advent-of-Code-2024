/**
 * https://adventofcode.com/2024/day/8
 * Answer: 1126
 */

type Coord = [row: number, col: number];

import prepareInput from "./prepareInput";

const part2 =  () => {

  const matrix =  prepareInput();
  const frequencies = collectFrequencies(matrix);
  const uniqueAntis = new Set<string>();

  for (let freq of Object.keys(frequencies)) {

    // frequencies[freq] is sorted by row, col asc. i.e [ [ 1, 8 ], [ 2, 5 ], [ 2, 7 ], [ 4, 4 ] ],
    // create antinodes for the the current against every other entry in the list of the same frequency
    for (let i = 0; i < frequencies[freq].length - 1; i++) {
      for (let j = i + 1; j < frequencies[freq].length; j++) {

        const freqA = frequencies[freq][i];
        const freqB = frequencies[freq][j];

        // since each node is an anti
        uniqueAntis.add(JSON.stringify(freqA));
        uniqueAntis.add(JSON.stringify(freqB));

        const [rowDiff, colDiff] = getDifference(freqA, freqB);


        let validAntiNode = false;
        let distanceMultiplier = 1;

        // check antinode above a
        // * -1 so we go up vs down
        // multiplying times the distance multiplier to keep going until hitting end of matrix
        do {
          const antiNodeA: Coord = [freqA[0] + rowDiff * (distanceMultiplier * -1), freqA[1] + colDiff * (distanceMultiplier * -1)];
          validAntiNode = isInBounds(matrix, antiNodeA);

          if (validAntiNode) {
            uniqueAntis.add(JSON.stringify(antiNodeA));
            distanceMultiplier++;
          }

        } while (validAntiNode)

        //reset
        distanceMultiplier = 1;

        //check antinode below b
        do {
          const antiNodeB: Coord = [freqB[0] + (rowDiff * distanceMultiplier), freqB[1] + (colDiff * distanceMultiplier)];
          validAntiNode = isInBounds(matrix, antiNodeB)

          if (validAntiNode) {
            uniqueAntis.add(JSON.stringify(antiNodeB));
            distanceMultiplier++;
          }

        } while (validAntiNode)
      }
    }
  }

  console.log('Answer:', uniqueAntis.size);
  return uniqueAntis.size;
};

const collectFrequencies = (matrix: string[][]) => {
  const frequencies: Record<string, Coord[]> = {};

  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      const curr = matrix[r][c];

      // if not . then its a freq
      if (curr !== '.') {
        if (!frequencies[curr])
          frequencies[curr] = [];

        frequencies[curr].push([r, c]);
      }
    }
  }

  return frequencies;
};

const getDifference = (a: Coord, b: Coord) => {
  const rowDiff = b[0] - a[0];
  const colDiff = b[1] - a[1];
  return [rowDiff, colDiff];
};

const isInBounds = (matrix: string[][], point: Coord) => {
  const [row, col] = point;
  const height = matrix.length;
  const width = matrix[0].length;
  // console.log(point, (row >= 0 && row < height && col >= 0 && col < width))
  return (row >= 0 && row < height && col >= 0 && col < width);
};

part2();