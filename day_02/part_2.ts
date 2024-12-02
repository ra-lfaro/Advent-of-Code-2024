/**
 * https://adventofcode.com/2024/day/2
 * Answer: 689
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
      if (curr < +report[report.length - 1])
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
      const copyRemovingCurr = [...report.slice(0, i), ...report.slice(i + 1)]
      const copyRemovingNext = [...report.slice(0, i + 1), ...report.slice(i + 2)]
      return isReportSafe(copyRemovingCurr, true) || isReportSafe(copyRemovingNext, true);
    }

  }

  return true;
};

calculateSafeReports();