import { promises as fs } from 'fs';

const parseInput = async (dir = './input.txt'): Promise<string[]> => {
  console.log('Reading Data from', dir);

  try {
    const data = await fs.readFile(dir, 'utf-8');
    return data.split("\n");
  } catch (error) {
    console.error('Error Parsing Input file', dir);
    console.error(error)
    return [];
  }
};

export { parseInput };