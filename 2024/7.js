const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(7, false);

function getEquations(input) {
  return input.split("\n").reduce((acc, line) => {
    const [total, values] = line.split(": ");
    return acc.set(Number(total), values.split(" ").map(Number));
  }, new Map());
}

function getAnswer(equations, testFunc) {
  const positives = equations.entries().reduce((acc, [total, values]) => {
    if (testFunc(total, values)) {
      acc.push(total);
    }
    return acc;
  }, []);

  return positives.reduce((sum, x) => sum + x);
}

function part1(equations) {
  function canBeTrue(total, values) {
    if (values.length === 1) {
      return total === values[0];
    }
    const [a, b, ...tail] = values;
    return (
      canBeTrue(total, [a + b, ...tail]) || canBeTrue(total, [a * b, ...tail])
    );
  }
  return getAnswer(equations, canBeTrue);
}

function part2(equations) {
  function canBeTrue(total, values) {
    if (values.length === 1) {
      return total === values[0];
    }
    const [a, b, ...tail] = values;
    return (
      canBeTrue(total, [a + b, ...tail]) ||
      canBeTrue(total, [a * b, ...tail]) ||
      canBeTrue(total, [Number(`${a}${b}`), ...tail])
    );
  }
  return getAnswer(equations, canBeTrue);
}

const equations = getEquations(inputs(1));
console.log({
  part1: part1(equations),
  part2: part2(equations),
});
