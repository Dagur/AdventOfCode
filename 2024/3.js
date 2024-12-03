const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(3, false);

function calc(input) {
  return input
    .matchAll(/mul\((\d+),(\d+)\)/g)
    .reduce(
      (sum, match) => (sum += match ? Number(match[1]) * Number(match[2]) : 0),
      0
    );
}

function part1(input) {
  return calc(input);
}

function part2(input) {
  const indexes = input
    .matchAll(/(do(?:n't)?\(\))/g)
    .reduce((acc, m) => {
      if (m && m[0] !== acc.at(-1)?.[0]) {
        acc.push(m);
      }
      return acc;
    }, [])
    .map((m) => m.index);

  indexes.unshift(0);
  let reduced = "";
  for (let i = 0; i <= indexes.length; i += 2) {
    if (typeof indexes[i] === "number") {
      reduced += input.slice(indexes[i], indexes[i + 1]);
    }
  }

  return calc(reduced);
}

console.log({
  part1: part1(inputs(1)),
  part2: part2(inputs(1)),
});
