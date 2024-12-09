/**
 * https://adventofcode.com/2024/day/9
 * Answer:
 */

import prepareInput from "./prepareInput";

const part1 = () => {

  const diskMap = prepareInput();

  const expandedMap = expandDiskMap(diskMap);
  sortSpacesToEnd(expandedMap);

  const checkSum = calcCheckSum(expandedMap);

  console.log('Answer:', checkSum);
  return checkSum;
};


const expandDiskMap = (diskMap: string) => {
  const expandedMap: string[] = [];

  let lastFileIndex = 0;

  for (let i = 0; i < diskMap.length; i++) {

    const segmentToAdd = new Array(+diskMap[i]);

    // evens are files
    // odds are spaces;

    if (!(i % 2)) {
      expandedMap.push(...(segmentToAdd).fill(lastFileIndex + ''))
      lastFileIndex++;
    } else {
      expandedMap.push(...(segmentToAdd).fill('.'))
    }

  }

  return expandedMap;
}


// inplace sorting of sorts to end
const sortSpacesToEnd = (diskMap: string[]) => {
  let r = diskMap.length - 1;
  let l = 0;

  while (l <= r) {

    if (diskMap[r] === '.') {
      r--;
      continue;
    }

    if (diskMap[l] === '.') {
      [diskMap[l], diskMap[r]] = [diskMap[r], diskMap[l]]
      r--;
    }

    l++;
  }

}

const calcCheckSum = (diskMap: string[]) => {
  let sum = 0;

  for (let i = 0; i < diskMap.length; i++) {
    // since its sorted once we hit spaces its done
    if (diskMap[i] === '.')
      break;

    sum += +diskMap[i] * i;
  }

  return sum;
}

part1();