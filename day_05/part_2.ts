/**
 * https://adventofcode.com/2024/day/5
 * Answer: 4719
 */

import prepareInput from "./prepareInput";

const part1 = async () => {

  const [rules, updates] = await prepareInput();

  const rulesLookup: Record<string, any> = createRulesLookup(rules)

  let fixedValidMiddleSums = 0

  for (let update of updates) {
    for (let i = 0; i < update.length; i++) {
      // if its not valid, fix it and then add middle to sum
      if (!isPageValidInUpdate(i, update, rulesLookup[update[i]])) {

        // we build a new valid array rather then reordering the current one
        // having a valid updat earray each interaction
        let fixedUpdate: string[] = [];
        for (let i = 0; i < update.length; i++) {
          insertPageIntoUpdates(update[i], rulesLookup[update[i]], fixedUpdate);
        }

        fixedValidMiddleSums += +fixedUpdate[Math.floor(fixedUpdate.length / 2)]
        break
      }
    }
  }

  console.log('Answer', fixedValidMiddleSums);
  return fixedValidMiddleSums;
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

const insertPageIntoUpdates = (page: string, pageRules: any, updates: string[]) => {

  if (!updates.length) {
    updates.push(page)
    return;
  }

  // we pretend to insert the page at every index and check if it would be valid
  // if it is then we insert it at that index
  for (let i = 0; i <= updates.length; i++) {
    if (isPageValidInUpdate(i - 1, updates, pageRules)) {
      updates.splice(i, 0, page);
      break;
    }
  }

};

part1();