import { parseInput } from "../utils/parse";

const prepareInput = () => {
  // const input = parseInput(__dirname + '/sample.txt');
  const input = parseInput(__dirname + '/input.txt');

  const result: number[][] = [];

  for (let row of input) {
    result.push(row.split('').map(val => +val));
  }

  return result;
};

export default prepareInput;