import { parseInput } from "../utils/parse";

const prepareInput = async () => {
  // const input = await parseInput(__dirname + '/sample.txt');
  const input = await parseInput(__dirname + '/input.txt');

  const data: string[][] = [];

  for (let row of input) {
    data.push(row.split(' '));
  }

  return data;
};

export default prepareInput;