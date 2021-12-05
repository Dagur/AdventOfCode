import { readFile } from "./util";

async function getParsed(
  inputFileName: string
): Promise<Array<Array<boolean>>> {
  const data: any = await readFile(inputFileName);
  return data
    .split("\n")
    .map((line: string) => Array.from(line).map((bit) => bit === "1"));
}

function toDecimal(val: Array<"1" | "0">): number {
  return parseInt(val.join(""), 2);
}

async function part1(inputFileName: string): Promise<number> {
  const diagReport = await getParsed(inputFileName);
  const counts = diagReport.reduce((counters, row) => {
    for (let i = 0; i < row.length; i += 1) {
      if (row[i]) {
        counters[i] += 1;
      }
    }
    return counters;
  }, Array(diagReport[0].length).fill(0));

  const gamma = counts.map((count: number) =>
    count > diagReport.length / 2 ? "1" : "0"
  );
  const epsilon = gamma.map((b) => (b === "1" ? "0" : "1"));

  // Power consumption
  return toDecimal(gamma) * toDecimal(epsilon);
}

// Messy Part 2

function getRating(numbers: boolean[][], oxygen: boolean) {
  const size = numbers[0].length;
  let rating: Array<"1" | "0"> = [];
  let ones = [];
  let zeros = [];
  for (let i = 0; i < size; i += 1) {
    for (const number of numbers) {
      if (number[i]) {
        ones.push(number);
      } else {
        zeros.push(number);
      }
    }
    if (ones.length === 1 && zeros.length === 0) {
      rating = ones[0].map((n) => (n ? "1" : "0"));
      break;
    } else if (ones.length === 0 && zeros.length === 1) {
      rating = zeros[0].map((n) => (n ? "1" : "0"));
      break;
    }

    if (zeros.length <= ones.length) {
      rating.push(oxygen ? "1" : "0");
      numbers = oxygen ? ones : zeros;
    } else {
      rating.push(oxygen ? "0" : "1");
      numbers = oxygen ? zeros : ones;
    }

    ones = [];
    zeros = [];
  }
  return toDecimal(rating);
}

async function part2(inputFileName: string): Promise<number> {
  const diagReport = await getParsed(inputFileName);

  return getRating(diagReport, true) * getRating(diagReport, false);
}

const functions = {
  part1,
  part2,
};
export default functions;
