const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(2, false);

function inputToArray() {
  const values = inputs(1);
  return values.split("\n").map((line) => line.split(" ").map(Number));
}

function getTrend(line) {
  let trend = 0;
  for (let i = 1; i < line.length; i++) {
    if (line[i - 1] < line[i]) {
      trend += 1;
    } else {
      trend -= 1;
    }
  }
  return trend;
}

function isSafe(line, useDampener = false) {
  const trend = getTrend(line);
  if (trend === 0) {
    return false;
  } else if (trend < 0) {
    line.reverse();
  }

  for (let i = 1; i < line.length; i++) {
    const diff = line[i] - line[i - 1];
    if (diff < 1 || diff > 3) {
      if (useDampener) {
        return isSafe(line.toSpliced(i, 1)) || isSafe(line.toSpliced(i - 1, 1));
      } else {
        return false;
      }
    }
  }
  return true;
}

function part1() {
  const values = inputToArray();
  return values.reduce((acc, line) => acc + (isSafe(line) ? 1 : 0), 0);
}

function part2() {
  const values = inputToArray();
  return values.reduce((acc, line) => acc + (isSafe(line, true) ? 1 : 0), 0);
}

console.log({
  part1: part1(),
  part2: part2(),
});
