import { parseInput } from "../utils/parse";

const prepareInput = () => {
  // const input = parseInput(__dirname + '/sample.txt');
  // const input = parseInput(__dirname + '/input.txt');
  const input = parseInput(__dirname + '/input2.txt');

  return input[0];
};

export default prepareInput;