/**
 * https://adventofcode.com/2024/day/1
 * Answer: 23981443
 */

import prepareInput from "./prepareInput";

const calculateSimilarityScore = async () => {
  const [list1, list2] = await prepareInput();

  // count number of instances in list2;
  const l2Occurrances = {};
  list2.forEach((val) => {
    l2Occurrances[val] = (l2Occurrances[val] ?? 0) + 1;
  })

  // calculate similarity store 
  // sum of ( list1[i] * l2Occurrances[list1[i]] )
  let similarityScore = 0;

  for (let val of list1) {
    similarityScore += (l2Occurrances[val] ?? 0) * val
  }

  console.log('Answer:', similarityScore)
  return similarityScore;
};


calculateSimilarityScore();
