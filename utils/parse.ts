import fs from 'fs';

const parseInput = (dir = './input.txt'): string[] => {
  console.log('Reading Data from', dir);

  try {
    const data = fs.readFileSync(dir, 'utf-8');
    return data.split("\n");
  } catch (error) {
    console.error('Error Parsing Input file', dir);
    console.error(error)
    return [];
  }
};

export { parseInput };