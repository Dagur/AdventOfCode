import { readFile } from "./util.ts";

async function getParsed(inputFileName: string): number[] {
  const data = await readFile(inputFileName);
  return data.split("\n").map(line => parseInt(line));
}

async function part1(inputFileName: string): number {
  const data = await getParsed(inputFileName);
  let count = 0;
  let prev: number;
  for (const depth of data) {
    if (prev && prev < depth) {
      count += 1;
    }
    prev = depth;
  }
  return count;
}

async function part2(inputFileName: string): number {
  const data = await getParsed(inputFileName);
  let count = 0;
  let prev: number;
  for (let i = 0; i < data.length; i++) {
    const window = data[i] + data[(i + 1) % data.length] + data[(i + 2) % data.length];
    if (prev && prev < window) {
      count += 1;
    }
    prev = window;
  }
  return count;
}

const functions = {
  part1,
  part2,
};
export default functions;