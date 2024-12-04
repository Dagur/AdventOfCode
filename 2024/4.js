const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(4, true);

function countLine(line) {
  return line.matchAll(/(?=(XMAS)|(SAMX))/g).toArray().length;
}

function part1(input) {
  const grid = input.split("\n");
  let count = grid.reduce((sum, line) => sum + countLine(line), 0);

  for (let x = 0; x < grid[0].length; x++) {
    const tcol = [];
    for (let y = 0; y < grid.length; y++) {
      tcol.push(grid[y][x]);
      let dcol = "";
      let rdcol = "";
      for (let i = 0; i < 4; i++) {
        dcol += grid[y + i]?.[x + i];
        rdcol += grid[y + i]?.[x - i];
      }
      count += [dcol, rdcol].filter(
        (col) => col === "XMAS" || col === "SAMX"
      ).length;
    }
    count += countLine(tcol.join(""));
  }

  return count;
}

function checkMas(grid, x, y) {
  if (grid[x + 1][y + 1] !== "A") {
    return false;
  }
  const p1 = grid[x][y] + grid[x + 2][y + 2];
  const p2 = grid[x][y + 2] + grid[x + 2][y];

  return (p1 === "MS" || p1 === "SM") && (p2 === "MS" || p2 === "SM");
}

function part2(input) {
  const grid = input.split("\n");
  const [cols, rows] = [grid[0].length, grid.length];

  let matches = 0;
  for (let x = 0; x < cols - 2; x++) {
    for (let y = 0; y < rows; y++) {
      if (checkMas(grid, x, y)) {
        matches += 1;
      }
    }
  }

  return matches;
}

console.log({
  part1: part1(inputs(1)),
  part2: part2(inputs(1)),
});
