import { parseInput } from "../utils/parse";


export type Equation = {
  total: number,
  variables: number[]
};

const prepareInput = async () => {
  // const input = await parseInput(__dirname + '/sample.txt');
  const input = await parseInput(__dirname + '/input.txt');

  const result: Equation[] = [];

  for (let row of input) {
    const [total, variables] = row.split(': ');
    // convert to numbers here for simplicity
    result.push({ total: +total, variables: variables.split(' ').map(val => +val) });
  }

  return result;
};

export default prepareInput;