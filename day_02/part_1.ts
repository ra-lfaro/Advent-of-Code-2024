/**
 * https://adventofcode.com/2024/day/2
 * Answer: 660
 */

import prepareInput from "./prepareInput";

const MAX_SAFE_DIFF = 3;

const calculateSafeReports = () => {

  const reports = prepareInput();

  let safeReports = 0;

  for (let r of reports) {
    if (isReportSafe(r))
      safeReports++;
  }

  console.log('Answer:', safeReports);
  return safeReports;
};

const isReportSafe = (report: string[]) => {

  let isIncreasing = false;

  for (let i = 0; i < report.length - 1; i++) {

    const curr = +report[i];
    const next = +report[i + 1];

    // determine if it will be ascending or descending
    if (!i) {
      if (curr < next)
        isIncreasing = true;
    }

    // if it doesnt continue the trend its no good
    if (isIncreasing) {
      if (curr >= next || (next - curr) > MAX_SAFE_DIFF) {
        return false;
      }
    } else {
      if (curr <= next || (curr - next) > MAX_SAFE_DIFF) {
        return false;
      }
    }


  }

  return true;
};

calculateSafeReports();