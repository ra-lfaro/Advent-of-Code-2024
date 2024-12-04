import { parseInput } from "../utils/parse";

const prepareInput = async () => {
  // const input = await parseInput(__dirname + '/sample.txt');
  const input = await parseInput(__dirname + '/input.txt');

  const result: string[][] = [];

  // lets convert this to a matrix of letters instead
  for (let row of input) {
    result.push(row.split(''));
  }

  return result;
};

export default prepareInput;