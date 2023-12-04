const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();

const example1 = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
].join("\n");

const example2 = [
  "..616...............",
  "...*....49.....-....",
  "...863.....%.72.....",
  ".........171........",
  "..............308..5",
  "..............*.....",
  ".......582..335...26",
  "......*.............",
  "....827.............",
  "........@......278*.",
  ".....990...........7",
  "....................",
].join("\n");

function toArray(content) {
  return content
    .split("\n")
    .map((line) => line.trim().split(""))
    .filter((line) => line.length);
}

function findNumbers(input) {
  const ret = [];

  for (let y = 0; y < input.length; y++) {
    let num = null;
    let numcoords = null;
    const line = input[y];

    for (let x = 0; x < line.length; x++) {
      const c = line[x];
      const isNumber = !isNaN(Number(c));
      if (isNumber) {
        if (num) {
          num += c;
        } else {
          num = c;
          numcoords = [x, y];
        }
      }

      if (num !== null && (!isNumber || x === line.length - 1)) {
        ret.push([numcoords, num]);
        num = numcoords = null;
      }
    }
  }
  return ret;
}

function sumPartNumbers(input, numbers) {
  const width = input[0].length;
  const height = input.length;

  return numbers
    .map(([coords, value]) => {
      const [nx, ny] = coords;
      const xStart = Math.max(0, nx - 1);
      const xEnd = Math.min(nx + value.length, width - 1);
      const yStart = Math.max(0, ny - 1);
      const yEnd = Math.min(ny + 1, height - 1);

      for (let y = yStart; y <= yEnd; y++) {
        for (let x = xStart; x <= xEnd; x++) {
          const s = input[y][x];
          if (s !== "." && isNaN(Number(s))) {
            return Number(value);
          }
        }
      }
      return 0;
    })
    .reduce((acc, val) => acc + val, 0);
}

function findGearNumbers(input, numbers) {
  const width = input[0].length;
  const height = input.length;
  const ret = {};

  for (let i = 0; i < numbers.length; i++) {
    const [coords, value] = numbers[i];
    const [nx, ny] = coords;
    const xStart = Math.max(0, nx - 1);
    const xEnd = Math.min(nx + value.length, width - 1);
    const yStart = Math.max(0, ny - 1);
    const yEnd = Math.min(ny + 1, height - 1);

    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        const s = input[y][x];
        if (s === "*") {
          const key = `${x}-${y}`;
          const num = Number(value);
          if (ret[key]) {
            ret[key].push(num);
          } else {
            ret[key] = [num];
          }
        }
      }
    }
  }

  return Object.values(ret).reduce(
    (acc, vals) => acc + (vals.length === 2 ? vals[0] * vals[1] : 0),
    0
  );
}

function solve1(content) {
  const input = toArray(content);
  const numbers = findNumbers(input);
  return sumPartNumbers(input, numbers);
}

function solve2(content) {
  const input = toArray(content);
  const numbers = findNumbers(input);
  return findGearNumbers(input, numbers);
}

console.log({
  // exampleSolution: solve1(example1), // 4361
  // exampleSolution2: solve1(example2), // 5049
  // gearSolutionExample1: solve2(example1) // 467835,
  solution1: solve1(content),
  solution2: solve2(content),
});
