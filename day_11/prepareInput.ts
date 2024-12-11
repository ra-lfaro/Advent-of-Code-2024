import { parseInput } from "../utils/parse";

const prepareInput = (useSample = true) => {
  let input;
  if (useSample)
    input = parseInput(__dirname + '/sample.txt');
  else
    input = parseInput(__dirname + '/input.txt');


  return input[0].split(' ').map(val => +val);
};

export default prepareInput;