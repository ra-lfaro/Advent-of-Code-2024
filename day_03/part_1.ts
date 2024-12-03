/**
 * https://adventofcode.com/2024/day/3
 * Answer: 185797128
 */

import prepareInput from "./prepareInput";

const UNCORRUPTED_REGEX = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/g

type MATCH_GROUP = {
  a: string;
  b: string;
}

const part1 = async () => {
  const data = await prepareInput();

  let sumOfProducts = 0;

  for (let row of data) {

    // regex match all valid mul(xxx,xxx) and sum the products
    for (const match of row.matchAll(UNCORRUPTED_REGEX)) {
      const { a, b } = match.groups as MATCH_GROUP;

      sumOfProducts += (+a * +b);
    }

  }

  console.log('Answer:', sumOfProducts);
  return sumOfProducts;
};

part1();