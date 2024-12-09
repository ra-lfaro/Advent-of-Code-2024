/**
 * https://adventofcode.com/2024/day/3
 * Answer: 89798695
 */

import prepareInput from "./prepareInput";

/*
* Matches three kinds of named groups or leaves the group undefined
* do
* dont
* mult > which will have a,b split out
* naming them makes it easy to traverse later
*/
const UNCORRUPTED_REGEX = /(?<dont>don\'t())|(?<do>do())|(?<mult>mul\((?<a>\d{1,3}),(?<b>\d{1,3})\))/g

type MATCH_GROUP = {
  do?: string;
  dont?: string;

  mult?: string;
  a: string;
  b: string;
}

const part1 = () => {
  const data = prepareInput();

  let sumOfProducts = 0;

  // outside the loop so that it persists accross rows
  let disabled = false;

  for (let row of data) {

    // loop through the matches in order enable/disabling and conditionally updating the sum when active
    for (const match of row.matchAll(UNCORRUPTED_REGEX)) {
      const groups = match.groups as MATCH_GROUP;

      if (groups?.dont) {
        disabled = true;
        continue;
      }

      if (groups?.do) {
        disabled = false;
        continue;
      }

      if (!disabled && groups.mult) {
        const { a, b } = groups;
        sumOfProducts += (+a * +b);
      }
    }

  }

  console.log('Answer:', sumOfProducts);
  return sumOfProducts;
};

part1();