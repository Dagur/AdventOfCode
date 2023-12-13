const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = [
  "...#......",
  ".......#..",
  "#.........",
  "..........",
  "......#...",
  ".#........",
  ".........#",
  "..........",
  ".......#..",
  "#...#.....",
  "",
].join("\n");

function toArray(content) {
  return content
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
}

function expand(space) {
  const cols = [];
  const rows = [];
  let addedCols = 0;
  let addedRows = 0;
  for (let x = 0; x < space[0].length; x++) {
    let xempty = true;
    let yempty = true;
    for (let y = 0; y < space.length; y++) {
      if (space[y][x] !== ".") {
        xempty = false;
      }
      if (space[x][y] !== ".") {
        yempty = false;
      }
    }
    if (xempty) {
      cols.push(x + addedCols);
      addedCols++;
    }
    if (yempty) {
      rows.push(x + addedRows);
      addedRows++;
    }
  }

  cols.forEach((c) => {
    space = space.map((row) => [...row.slice(0, c), ".", ...row.slice(c)]);
  });
  rows.forEach(r => space.splice(r+1, 0, new Array(space[0].length).fill(".")))

  return space;
}

function findGalaxies(space) {
  const points = [];
  for (let y = 0; y < space.length; y++) {
    for (let x = 0; x < space[0].length; x++) {
      if (space[y][x] === "#") {
        points.push([x, y]);
      }
    }
  }
  return points;
}

function calculateDistance(A, B) {
  return Math.abs(A[0] - B[0]) + Math.abs(A[1] - B[1]);
}

function solve(content) {
  const space = expand(toArray(content));
  // let c = 1;
  // for (let i = 0; i < space.length; i++) {
  //   console.log(space[i].map(x => x === "#" ? c++ : x).join(""));
  // }
  const galaxies = findGalaxies(space);
  const distances = [];

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      distances.push(calculateDistance(galaxies[i], galaxies[j]))
    }
  }

  return distances.reduce((acc, x) => acc + x, 0);
}

console.log({
  example1: solve(example1), // 374
  solution1: solve(content), // 10276166
});
