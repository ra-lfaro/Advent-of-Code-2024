/**
 * https://adventofcode.com/2024/day/10
 * Answer: 237149922829154
 */

import prepareInput from "./prepareInput";

const NUMBER_OF_BLINKS = 75;
const BLINK_INTERVALS = 25;

const part2 = () => {

  const data = prepareInput();

  const seenByInterval: Record<number, number[]> = {};

  let stones = 0;
  const blink = (stone: number, i: number) => {

    if (!seenByInterval[stone]) {
      seenByInterval[stone] = blinkIntervalTimes(stone, 0)
    }

    if (i === (NUMBER_OF_BLINKS - BLINK_INTERVALS)) {
      stones += seenByInterval[stone].length
      return;
    }

    for (let s of seenByInterval[stone]) {
      blink(s, i + BLINK_INTERVALS)
    }
  };

  for (let stone of data) {
    blink(stone, 0);
  }

  console.log('Answer:', stones);
};

const blinkIntervalTimes = (stone: number, i: number): number[] => {
  if (typeof stone !== 'number') {
    return [];
  }

  if (i === BLINK_INTERVALS) {
    return [stone]
  }

  const [first, second] = applyRules(stone);

  return [...blinkIntervalTimes(first, i + 1), ...blinkIntervalTimes(second, i + 1)]
}

const applyRules = (stone: number) => {

  if (stone === 0) {
    return [1];
  }

  // even length of characters; NOT even number value
  const stoneAsWord = `${stone}`;
  if (!(stoneAsWord.length % 2)) {
    return [+(stoneAsWord.substring(0, stoneAsWord.length / 2)), +(stoneAsWord.substring(stoneAsWord.length / 2))]
  }

  return [stone * 2024]
}

part2();