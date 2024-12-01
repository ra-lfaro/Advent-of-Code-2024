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
  });

  // calculate similarity store 
  // sum of ( list1[i] * l2Occurrances[list1[i]] )
  const similarityScore = list1.reduce((ongoing, val) => {
    return ongoing + ((l2Occurrances[val] ?? 0) * val);
  }, 0);

  console.log('Answer:', similarityScore)
  return similarityScore;
};


calculateSimilarityScore();
