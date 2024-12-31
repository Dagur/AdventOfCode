const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(14, false);

function parseInput(input) {
  const regex = /p=(\d+),(\d+) v=(-?\d+),(-?\d+)/g;
  return input
    .matchAll(regex)
    .map((m) => m.slice(1).map(Number))
    .map(([posx, posy, velx, vely]) => [
      [posx, posy],
      [velx, vely],
    ]);
}

function print(indexes, width, height) {
  let grid = "";
  for (let i = 0; i < height * width; i++) {
    if (indexes.has(i)) {
      grid += indexes.get(i) > 0 ? String(indexes.get(i)) : ".";
    } else {
      grid += ".";
    }
    if (i % width === width - 1) {
      grid += "\n";
    }
  }
  console.log(grid + "\n");
}

function getPoint(index, width, height) {
  return [index % width, Math.floor(index / width)];
}

function getSafetyFactor(indexes, width, height) {
  // Quadrant width and height
  const qWidth = Math.floor(width / 2);
  const qHeight = Math.floor(height / 2);
  const factors = {
    aa: 0,
    ab: 0,
    ba: 0,
    bb: 0,
  };
  for (const [index, robots] of indexes) {
    const [x, y] = getPoint(index, width, height);
    if (x === qWidth || y === qHeight) {
      continue;
    }
    if (x < qWidth) {
      if (y < qHeight) {
        factors.aa += robots;
      } else {
        factors.ba += robots;
      }
    } else {
      if (y < qHeight) {
        factors.ab += robots;
      } else {
        factors.bb += robots;
      }
    }
  }

  return factors.aa * factors.ab * factors.ba * factors.bb;
}

function mod(a, b) {
  const val = a % b;
  return val < 0 ? val + b : val;
}

function part1(input, width, height, steps = 100) {
  const gridSize = width * height;
  const indexes = new Map();
  for (const [pos, vel] of input) {
    const [x, y] = pos;
    const [vx, vy] = vel;
    const x1 = mod(x + vx * steps, width);
    const y1 = mod(y + vy * steps, height);
    const index = x1 + y1 * width;
    indexes.set(index, indexes.has(index) ? indexes.get(index) + 1 : 1);
  }
  // print(indexes, width, height);
  return getSafetyFactor(indexes, width, height);
}

function part2(input, width, height, steps = 100) {
  const gridSize = width * height;
  const indexes = new Map();
  let robots1 = input.toArray();

  for (const [pos] of input) {
    const [x, y] = pos;
    const index = x + y * width;
    indexes.set(index, indexes.has(index) ? indexes.get(index) + 1 : 1);
  }

  let minFactor = Infinity;
  let minStep = Infinity;
  let minIndexes;
  let robots = [];
  for (let i = 0; i < steps; i++) {
    robots = [...robots1];
    robots1 = [];
    for (const [pos, vel] of robots) {
      const [vx, vy] = vel;
      const [x, y] = pos;
      let index = x + y * width;
      if (typeof indexes.get(index) === "number") {
        indexes.set(index, Math.max(indexes.get(index) - 1, 0));
      }
      const x1 = mod(x + vx, width);
      const y1 = mod(y + vy, height);
      index = x1 + y1 * width;
      indexes.set(index, indexes.has(index) ? indexes.get(index) + 1 : 1);
      robots1.push([[x1, y1], vel]);
    }
    const factor = getSafetyFactor(indexes, width, height)
    if (factor < minFactor) {
      minFactor = factor;
      minStep = i + 1;
      minIndexes = structuredClone(indexes);
    }

  }
  print(minIndexes, width, height)
  return minStep;
}

console.log({
  part1: part1(parseInput(inputs(1)), 101, 103),
  part2: part2(parseInput(inputs(1)), 101, 103, 10000),
});
