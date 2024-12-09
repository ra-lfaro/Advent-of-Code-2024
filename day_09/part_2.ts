/**
 * https://adventofcode.com/2024/day/9
 * Answer: 6250605700557
 */

import prepareInput from "./prepareInput";

type Meta = {
  id: string | number;
  start: number;
  size: number;
}

const part2 = () => {

  const diskMap = prepareInput();

  const [expandedMap, metaData] = expandDiskMap(diskMap);
  sortFilesToStart(expandedMap, metaData);

  const checkSum = calcCheckSum(expandedMap);

  console.log('Answer:', checkSum);
  return checkSum;
};


const expandDiskMap = (diskMap: string): [string[], Meta[]] => {
  const expandedMap: string[] = [];
  const metaData: Meta[] = [];

  let lastFileIndex = 0;

  for (let i = 0; i < diskMap.length; i++) {

    const segmentToAdd = new Array(+diskMap[i]);


    metaData.push({
      id: !(i % 2) ? lastFileIndex : '.',
      start: expandedMap.length,
      size: +diskMap[i]
    })

    // evens are files
    // odds are spaces;

    if (!(i % 2)) {
      expandedMap.push(...(segmentToAdd).fill(lastFileIndex + ''))
      lastFileIndex++;
    } else {
      expandedMap.push(...(segmentToAdd).fill('.'))
    }

  }

  return [expandedMap, metaData];
}


// inplace sorting of sorts to end
// metadata id's will no longer match by the end of this - destructive
const sortFilesToStart = (diskMap: string[], metaData: Meta[]) => {

  // try to move the files from right to left each once
  for (let r = metaData.length - 1; r >= 0; r--) {

    if (metaData[r].id === '.') {
      continue;
    }

    // find a spot from the left that fits
    for (let l = 1; l < r; l++) {

      if (!metaData[l].size || metaData[l].id !== '.')
        continue;

      // if fits swap it
      if (metaData[r].size <= metaData[l].size) {

        for (let i = 0; i < metaData[r].size; i++) {
          // move to left
          diskMap[metaData[l].start + i] = metaData[r].id + '';
          //clear right
          diskMap[metaData[r].start + i] = '.';

        }

        // shrink current space meta
        metaData[l].size -= metaData[r].size
        metaData[l].start += metaData[r].size

        // done with this file
        break;
      }
    }
  }
}

const calcCheckSum = (diskMap: string[]) => {
  let sum = 0;

  for (let i = 0; i < diskMap.length; i++) {
    if (diskMap[i] === '.')
      continue;

    sum += +diskMap[i] * i;
  }

  return sum;
}

part2();