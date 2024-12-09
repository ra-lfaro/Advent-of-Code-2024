/**
 * https://adventofcode.com/2024/day/1
 * Answer: 1258579
 */

import prepareInput from "./prepareInput";

const calculateDistance = () => {
  const [list1, list2] = prepareInput();

  // we need to sort the lists to ensure we compare the correct values against each other
  // since the smallest x of l1 needs to comepare to smallest x of l2

  list1.sort((a, b) => a - b);
  list2.sort((a, b) => a - b);

  // compare differences and sum
  let totalDistance = 0;

  // we make the assumption both lists will have the same length
  for (let i = 0; i < list1.length; i++) {
    totalDistance += Math.abs(list1[i] - list2[i]);
  }

  console.log('Answer:', totalDistance)
  return totalDistance;
};


calculateDistance();
