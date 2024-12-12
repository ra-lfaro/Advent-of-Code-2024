/**
 * https://adventofcode.com/2024/day/10
 * Answer: 237149922829154
 */

import prepareInput from "./prepareInput";

const NUMBER_OF_BLINKS = 75;

const part2 = () => {

  const data = prepareInput();

  const seen: Record<number, Record<number, number>> = {};

  const blink = (stone: number | undefined, i: number): number => {
    if (typeof stone !== 'number')
      return 0;

    if (i === NUMBER_OF_BLINKS)
      return 1;

    if (seen[stone]?.[i])
      return seen[stone][i];

    const [first, second] = applyRules(stone);
    const result = blink(first, i + 1) + blink(second, i + 1);

    if (seen[stone])
      seen[stone][i] = result;
    else
      seen[stone] = { [i]: result }

    return result;
  };

  let stones = 0;

  for (let stone of data) {
    stones += blink(stone, 0);
  }

  console.log('Answer:', stones);
};

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