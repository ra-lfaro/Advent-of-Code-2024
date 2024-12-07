/**
 * https://adventofcode.com/2024/day/7
 * Answer: 465126289353
 */

import prepareInput, { type Equation } from "./prepareInput";

const part1 = async () => {

  const calibrations: Equation[] = await prepareInput();

  // we try the different operations at each step and see if any path gets us 
  // to the final total by the time we are at the last variable input
  const dfs = (currTotal: number, i: number, equation: Equation): boolean => {

    if (i === equation.variables.length) {
      return currTotal === equation.total;
    }

    // try each possible option at this position
    return dfs(currTotal * equation.variables[i], i + 1, equation) ||
      dfs(currTotal + equation.variables[i], i + 1, equation)

  }

  let totalCalibration = 0;
  for (let equation of calibrations) {
    // start with first value as the currentTotal
    if (dfs(equation.variables[0], 1, equation))
      totalCalibration += equation.total;
  }

  console.log('Answer:', totalCalibration);
  return totalCalibration;
};

part1();