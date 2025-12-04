import { createInputSelector } from "./util/inputSelector.mjs";
const inputs = createInputSelector(2, false);
const ranges = inputs(1)
  .split(",")
  .map((range) => range.split("-").map(Number));

function run(isValid) {
  let invalidIds = [];
  for (const [start, end] of ranges) {
    for (let i = start; i <= end; i++) {
      if (!isValid(i.toString())) {
        invalidIds.push(i);
      }
    }
  }

  return invalidIds.reduce((sum, id) => sum + id);
}

function part1() {
  function validator(value) {
    if (value.length % 2 !== 0) {
      return true;
    }

    const middle = value.length / 2;
    const [head, tail] = [value.slice(0, middle), value.slice(middle)];
    return head !== tail;
  }
  return run(validator);
}

function part2() {
  function validator(value) {
    for (let i = Math.floor(value.length / 2); i > 0; i--) {
      const pattern = value.slice(0, i);
      if (pattern.repeat(value.length / i) === value) {
        return false;
      }
    }
    return true
  }

  return run(validator);
}

console.log({
  part1: part1(),
  part2: part2(),
});
