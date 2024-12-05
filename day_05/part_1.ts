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

// ever entry will have all of the rules that it needs to come before AND after
/* 
  { 
    '14': {
      before: Set { '13', '12' }, // 14 needs to come before 13 and 12
      after: Set { '15', '16' } // 14 needs to come after 15 and 16
    },
*/
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

/*
  we pass in the rules of the page we are validating (pageIndex)
  we check every entry before the current page and make sure that it is valid
  by making sure nothing that is supposed to come after it, is before it
  similarly we make sure nothing that is supposed to come before it, is after it
*/
const isPageValidInUpdate = (pageIndex: number, updates: string[], pageRules: Record<string, any>) => {

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