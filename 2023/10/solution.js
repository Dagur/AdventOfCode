const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = ["7-F7-", ".FJ|7", "SJLL7", "|F--J", "LJ.LJ", ""].join("\n");

// 7-F7-
// .FJ|7
// SJLL7
// |F--J
// LJ.LJ

function toArray(content) {
  return content
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
}

function getStartingPoint(grid) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < grid.length; x++) {
      if (row[x] === "S") {
        return [x, y];
      }
    }
  }
}

function getSymbol(directions) {
  switch (directions) {
    case "NE":
      return "L";
    case "NW":
      return "7";
    case "NS":
      return "|";
    case "ES":
      return "F";
    case "EW":
      return "-";
    case "SW":
      return "J";
  }
}

function getDirections(pos, grid) {
  const height = grid.length;
  const width = grid[0].length;
  const [px, py] = pos;
  let directions = "";

  const [north, east, south, west] = [
    [px, py - 1],
    [px + 1, py],
    [px, py + 1],
    [px - 1, py],
  ];
  if (
    !north.some((n) => n < 0) &&
    ["|", "7", "F"].includes(grid[north[1]][north[0]])
  ) {
    directions += "N";
  }
  if (
    !east.some((n) => n < 0) &&
    ["-", "7", "J"].includes(grid[east[1]][east[0]])
  ) {
    directions += "E";
  }
  if (
    !south.some((n) => n < 0) &&
    ["|", "L", "J"].includes(grid[south[1]][south[0]])
  ) {
    directions += "S";
  }
  if (
    !west.some((n) => n < 0) &&
    ["-", "L", "F"].includes(grid[west[1]][west[0]])
  ) {
    directions += "W";
  }

  return directions;
}

function step(grid, pos, direction) {
  switch (direction) {
    case "N": {
      const [x, y] = [pos[0], pos[1] - 1];
      const newpos = [x, y];
      switch (grid[y][x]) {
        case "|":
          return [newpos, "N"];
        case "7":
          return [newpos, "W"];
        case "F":
          return [newpos, "E"];
      }
    }
    case "E": {
      const [x, y] = [pos[0] + 1, pos[1]];
      const newpos = [x, y];
      switch (grid[y][x]) {
        case "-":
          return [newpos, "E"];
        case "7":
          return [newpos, "S"];
        case "J":
          return [newpos, "N"];
      }
    }
    case "S": {
      const [x, y] = [pos[0], pos[1] + 1];
      const newpos = [x, y];
      switch (grid[y][x]) {
        case "|":
          return [newpos, "S"];
        case "L":
          return [newpos, "E"];
        case "J":
          return [newpos, "W"];
      }
    }
    case "W": {
      const [x, y] = [pos[0] - 1, pos[1]];
      const newpos = [x, y];
      switch (grid[y][x]) {
        case "-":
          return [newpos, "W"];
        case "L":
          return [newpos, "N"];
        case "F":
          return [newpos, "S"];
      }
    }
  }
}

function solve(content) {
  const grid = toArray(content);
  const s = getStartingPoint(grid);
  const directions = getDirections(s, grid);
  grid[s[1]][s[0]] = getSymbol(directions);
  let pos = s;
  let direction = directions[0];
  let count = 0;
  do {
    [pos, direction] = step(grid, pos, direction);
    count++;
  } while (!(pos[0] === s[0] && pos[1] === s[1]));

  return count / 2;
}

console.log({
  example1: solve(example1),
  solution1: solve(content)
});
