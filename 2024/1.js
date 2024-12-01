const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(1, false);

function makeLists(inputs) {
  return inputs
    .split("\n")
    .map((line) => line.split("   "))
    .reduce(
      (acc, [a, b]) => {
        acc.a.push(Number(a));
        acc.b.push(Number(b));
        return acc;
      },
      { a: [], b: [] }
    );
}

function part1() {
  const { a, b } = makeLists(inputs(1));
  a.sort((x, y) => x - y);
  b.sort((x, y) => x - y);

  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff += Math.abs(a[i] - b[i]);
  }

  return diff;
}

function part2() {
  const { a, b } = makeLists(inputs(1));
  const frequency = Object.groupBy(b, (val) => val);

  return a.reduce(
    (sum, val) => (sum += val * (frequency[val]?.length ?? 0)),
    0
  );
}

console.log({
  part1: part1(),
  part2: part2(),
});
