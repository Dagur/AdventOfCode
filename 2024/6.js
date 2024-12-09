const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(6, false);

const turns = new Map([
  ["N", "E"],
  ["E", "S"],
  ["S", "W"],
  ["W", "N"],
]);

function getPos(width, index) {
  const col = Math.floor(index / width);
  const row = index % width;
  return [row, col];
}

function move(direction, position, obstacles) {
  let newPos;
  switch (direction) {
    case "N":
      newPos = position.with(1, position[1] - 1);
      break;
    case "E":
      newPos = position.with(0, position[0] + 1);
      break;
    case "S":
      newPos = position.with(1, position[1] + 1);
      break;
    case "W":
      newPos = position.with(0, position[0] - 1);
      break;
  }
  if (obstacles[newPos[0]]?.includes(newPos[1])) {
    return move(turns.get(direction), position, obstacles);
  } else {
    return [direction, newPos];
  }
}

function getPath(width, height, startPos, obstacles) {
  const path = [];
  let position = startPos;
  let direction = "N";
  let startTime = performance.now();
  while (
    position[0] > 0 &&
    position[0] < width &&
    position[1] > 0 &&
    position[1] < height
  ) {
    const point = `${direction}-${position[0]}-${position[1]}`;
    if (path.includes(point)) {
      return;
    }
    path.push(point);
    [direction, position] = move(direction, position, obstacles);
  }

  return path;
}

function part1(input) {
  const grid = input.replaceAll("\n", "");
  const width = input.indexOf("\n");
  const height = grid.length / width;
  const startPos = getPos(width, grid.indexOf("^"));
  const obstacles = grid.matchAll("#").reduce((acc, m) => {
    const [row, col] = getPos(width, m.index);
    if (acc[row]) {
      acc[row].push(col);
    } else {
      acc[row] = [col];
    }
    return acc;
  }, {});

  const visited = new Set(
    getPath(width, height, startPos, obstacles).map((point) =>
      point.substring(1)
    )
  );

  return visited.size;
}

function part2(input) {
  const grid = input.replaceAll("\n", "");
  const width = input.indexOf("\n");
  const height = grid.length / width;
  const startPos = getPos(width, grid.indexOf("^"));
  const obstacles = grid.matchAll("#").reduce((acc, m) => {
    const [row, col] = getPos(width, m.index);
    if (acc[row]) {
      acc[row].push(col);
    } else {
      acc[row] = [col];
    }
    return acc;
  }, {});

  const path = getPath(width, height, startPos, obstacles);
  let loopPoints = new Set();
  for (const point of path.splice(1)) {
    const [x, y] = point.split("-").slice(1).map(Number);
    const blockers = structuredClone(obstacles);
    if (blockers[x]) {
      blockers[x].push(y);
    } else {
      blockers[x] = [y];
    }
    if (getPath(width, height, startPos, blockers) === undefined) {
      loopPoints.add(point.slice(1));
    }
  }

  return loopPoints;
}

console.log({
  part1: part1(inputs(1)),
  part2: part2(inputs(1)),
});
