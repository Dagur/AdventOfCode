const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(10, false);

function parseInput(input) {
  const grid = input.split("\n").map((line) => line.split("").map(Number));
  const trailheads = grid
    .flatMap((row, i) => row.map((col, j) => (col === 0 ? [j, i] : undefined)))
    .filter(Boolean);

  return {
    grid,
    trailheads,
  };
}

function hike(grid, trailhead) {
  const endPoints = [];
  function progress(position, elevation) {
    const [x, y] = position;
    if (grid[y][x] === 9) {
      endPoints.push(position);
    }
    const possibles = [];
    if (grid[y - 1]?.[x] === elevation + 1) {
      possibles.push([x, y - 1]);
    }
    if (grid[y]?.[x - 1] === elevation + 1) {
      possibles.push([x - 1, y]);
    }
    if (grid[y + 1]?.[x] === elevation + 1) {
      possibles.push([x, y + 1]);
    }
    if (grid[y]?.[x + 1] === elevation + 1) {
      possibles.push([x + 1, y]);
    }
    if (possibles.length > 0) {
      possibles.map((point) => progress(point, elevation + 1));
    }
  }
  progress(trailhead, 0);
  return endPoints.map(
    ([x, y]) => `${trailhead[0]},${trailhead[1]} => ${x},${y}`
  );
}

function part1(input) {
  const { grid, trailheads } = parseInput(input);
  const endPoints = trailheads.flatMap((th) => hike(grid, th));
  return new Set(endPoints).size;
}

function part2(input) {
  const { grid, trailheads } = parseInput(input);
  const endPoints = trailheads.flatMap((th) => hike(grid, th));
  return endPoints.length;
}

console.log({
  part1: part1(inputs(1)),
  part2: part2(inputs(1)),
});
