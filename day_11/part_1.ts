/**
 * https://adventofcode.com/2024/day/10
 * Answer: 199982
 */

import prepareInput from "./prepareInput";

const NUMBER_OF_BLINKS = 25;

const part1 = () => {

  const data = prepareInput(false);

  const blinkOutput: number[][] = [data];

  let i = 0;
  while (i < NUMBER_OF_BLINKS) {

    const curr = blinkOutput.at(-1) || [];
    const output = [];

    for (let stone of curr) {
      output.push(...blink(stone))
    }

    i++;
    blinkOutput.push(output);
  }

  console.log('Answer:', blinkOutput.at(-1)?.length);
  return blinkOutput.at(-1)?.length;
};

const blink = (stone: number) => {

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

part1();