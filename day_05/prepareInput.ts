import { parseInput } from "../utils/parse";

const prepareInput = async () => {
  // const input = await parseInput(__dirname + '/sample.txt');
  const input = await parseInput(__dirname + '/input.txt');

  const rules: [string, string][] = []
  const updates: string[][] = [];


  for (let row of input) {
    if (row.includes('|')) {
      rules.push(row.split('|') as [string, string])
    } else if (row.includes(',')) {
      updates.push(row.split(','));
    }
  }

  return [rules, updates];
};

export default prepareInput;