import { readFile } from "./util";

async function getParsed(inputFileName: string): Promise<number[]> {
  const data: any = await readFile(inputFileName);
  return data.split("\n").map((line: string) => parseInt(line));
}

async function part1(inputFileName: string): Promise<number> {
  const data = await getParsed(inputFileName);
  let count = 0;
  let prev: number | void;
  for (const depth of data) {
    if (prev && prev < depth) {
      count += 1;
    }
    prev = depth;
  }
  return count;
}

async function part2(inputFileName: string): Promise<number> {
  const data = await getParsed(inputFileName);
  let count = 0;
  let prev: number | void;
  for (let i = 0; i < data.length; i++) {
    const window =
      data[i] + data[(i + 1) % data.length] + data[(i + 2) % data.length];
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
