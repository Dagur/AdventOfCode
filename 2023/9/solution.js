const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = [
  "0 3 6 9 12 15",
  "1 3 6 10 15 21",
  "10 13 16 21 30 45",
  "",
].join("\n");

function toArray(content) {
  return content
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map(Number));
}

function getSteps(history) {
  const steps = [history];
  while (steps.at(-1).some((x) => x !== 0)) {
    let next = [];
    let prev = steps.at(-1);
    for (let i = 1; i < prev.length; i++) {
      next.push(prev[i] - prev[i - 1]);
    }
    steps.push(next);
  }
  return steps;
}

function getHistoryValue(history) {
  const steps = getSteps(history);
  return steps.reverse().reduce((acc, line) => acc + line.at(-1), 0);
}

function getHistoryValueBackwards(history) {
  const steps = getSteps(history);
  let added = 0;
  for (let i = steps.length - 1; i >= 0; i--) {
    const step = steps[i];
    added = step[0] - added;
  }

  return added;
}

function solve(content) {
  const input = toArray(content);
  return input.map(getHistoryValue).reduce((acc, x) => acc + x, 0);
}

function solve2(content) {
  const input = toArray(content);
  return input.map(getHistoryValueBackwards).reduce((acc, x) => acc + x, 0);
}

console.log({
  example1: solve(example1),
  solution1: solve(content),
  example2: solve2(example1),
  solution2: solve2(content),
});
