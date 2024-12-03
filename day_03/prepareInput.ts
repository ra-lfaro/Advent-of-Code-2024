import { parseInput } from "../utils/parse";

const prepareInput = async () => {
  // const input = await parseInput(__dirname + '/sample.txt');
  // const input = await parseInput(__dirname + '/sample2.txt');
  const input = await parseInput(__dirname + '/input.txt');

  return input;
};

export default prepareInput;