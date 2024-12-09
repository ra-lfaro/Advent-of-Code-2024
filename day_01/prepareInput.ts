import { parseInput } from "../utils/parse";

const prepareInput = (): [number[], number[]] => {
  // gather input data
  // const input = parseInput(__dirname + '/sample.txt');
  const input = parseInput(__dirname + '/input.txt');

  //parse each row into two lists
  const list1: number[] = [];
  const list2: number[] = [];

  input.forEach((row) => {
    const [l1, l2] = row.split(/ +/);
    list1.push(+l1);
    list2.push(+l2);
  })

  return [list1, list2];
};

export default prepareInput;