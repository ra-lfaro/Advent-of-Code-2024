/**
 * https://adventofcode.com/2024/day/2
 * Answer: 
 */

import prepareInput from "./prepareInput";

const MAX_SAFE_DIFF = 3;

const calculateSafeReports = async () => {

  const reports = await prepareInput();

  let safeReports = 0;

  for (let r of reports) {
    if (isReportSafe(r)) {
      safeReports++;
    }
  }

  console.log('Answer:', safeReports);
  return safeReports;
};

const isReportSafe = (report: string[], failedPreviously = false): boolean => {

  let isIncreasing = false;
  let tryDampener = false;

  for (let i = 0; i < report.length - 1; i++) {

    const curr = +report[i];
    const next = +report[i + 1];

    // determine if it will be ascending or descending
    if (!i) {
      if (curr < next)
        isIncreasing = true;
    }

    if (isIncreasing) {
      if (curr >= next || (next - curr) > MAX_SAFE_DIFF) {
        if (failedPreviously) {
          return false;
        }

        tryDampener = true;
      }
    } else {
      if (curr <= next || (curr - next) > MAX_SAFE_DIFF) {
        if (failedPreviously) {
          return false;
        }

        tryDampener = true;
      }
    }

    if (tryDampener) {
      // this is for an edge case where the prev is a is valid to the curr but its actually the odd man out to everything else
      if (i > 0) {
        const copyRemovingPrev = [...report.slice(0, i - 1), ...report.slice(i)]
        if (isReportSafe(copyRemovingPrev, true))
          return true;
      }

      const copyRemovingCurr = [...report.slice(0, i), ...report.slice(i + 1)]
      const copyRemovingNext = [...report.slice(0, i + 1), ...report.slice(i + 2)]
      return isReportSafe(copyRemovingCurr, true) || isReportSafe(copyRemovingNext, true);
    }

  }

  return true;
};

calculateSafeReports();