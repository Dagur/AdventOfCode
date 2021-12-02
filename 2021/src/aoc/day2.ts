import { readFile } from "./util.ts";

type Command = {
  instruction: "up" | "down" | "forward",
  value: number
}

async function getParsed(inputFileName: string): Command[] {
  const data = await readFile(inputFileName);
  return data.split("\n")
    .map(line => line.split(" "))
    .map(([instruction, value]) => ({ instruction, value: parseInt(value) }));
}

async function part1(inputFileName: string): number {
  const data = await getParsed(inputFileName);
  const position = data.reduce((placement, command) => {
    const { instruction, value } = command;
    switch (instruction) {
    case "forward":
      placement.horizontal += value;
      return placement;
    case "up":
      placement.depth -= value;
      return placement;
    case "down":
      placement.depth += value;
      return placement;
    }
  }, { depth: 0, horizontal: 0 });
  return position.depth * position.horizontal;
}

async function part2(inputFileName: string): number {
  const data = await getParsed(inputFileName);

  const position = data.reduce((placement, command) => {
    const { instruction, value } = command;
    switch (instruction) {
    case "forward":
      placement.horizontal += value;
      placement.depth += value * placement.aim;
      return placement;
    case "up":
      placement.aim -= value;
      return placement;
    case "down":
      placement.aim += value;
      return placement;
    }
  }, { depth: 0, horizontal: 0, aim: 0 });

  return position.depth * position.horizontal;
}

const functions = {
  part1,
  part2,
};
export default functions;