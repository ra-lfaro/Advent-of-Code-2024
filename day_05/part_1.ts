/**
 * https://adventofcode.com/2024/day/5
 * Answer: 5964
 */

import prepareInput from "./prepareInput";

const part1 = async () => {

  const [rules, updates] = await prepareInput();

  const rulesLookup: Record<string, any> = createRulesLookup(rules)

  let validMiddleSum = 0;

  for (let update of updates) {
    let validRuleset = true;
    for (let i = 0; i < update.length; i++) {
      if (!isPageValidInUpdate(i, update, rulesLookup[update[i]])) {
        validRuleset = false;
        break
      }
    }

    if (validRuleset)
      validMiddleSum += +update[Math.floor(update.length / 2)]
  }

  console.log('Answer', validMiddleSum);
  return validMiddleSum;
};

const createRulesLookup = (rules: string[][]) => {
  const rulesLookup: Record<string, any> = {}

  for (let [l, r] of rules) {

    if (!rulesLookup[l]) {
      rulesLookup[l] = {
        before: new Set(),
        after: new Set()
      }
    }

    if (!rulesLookup[r]) {
      rulesLookup[r] = {
        before: new Set(),
        after: new Set()
      }
    }

    rulesLookup[l].before.add(r);
    rulesLookup[r].after.add(l);

  }

  return rulesLookup;
}

const isPageValidInUpdate = (pageIndex: number, updates: string[], pageRules: any) => {

  for (let i = 0; i < pageIndex; i++) {
    if (pageRules.before.has(updates[i]))
      return false;
  }

  for (let i = pageIndex + 1; i < updates.length; i++) {
    if (pageRules.after.has(updates[i]))
      return false;
  }

  return true;
};

part1();