const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(13, true);

function toPOJO(input) {
  const regex =
    /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;

  return input
    .matchAll(regex)
    .map(([_, ax, ay, bx, by, prizex, prizey]) => ({
      ax: Number(ax),
      ay: Number(ay),
      bx: Number(bx),
      by: Number(by),
      prizex: Number(prizex),
      prizey: Number(prizey),
    }))
    .toArray();
}

function getBest(problem) {
  const { ax, ay, bx, by, prizex, prizey } = problem;
  const maxa = Math.max(Math.floor(prizex / ax), Math.floor(prizey / ay));
  const maxb = Math.max(Math.floor(prizex / bx), Math.floor(prizey / by));



  let best = { a: 0, b: 0, total: Infinity };
  for (let a = 0; a < maxa; a++) {
    for (let b = 0; b < maxb; b++) {
      if (a * ax + b * bx === prizex && a * ay + b * by === prizey) {
        if (a * 3 + b < best.total) {
          best = { a, b, total: a * 3 + b };
        }
      }
    }
  }

  console.log(best)

  return best;
}

function part1(input) {
  const thebest = input.map(getBest);

  return thebest.reduce(
    (sum, { total }) => sum + (total < Infinity ? total : 0),
    0
  );
}

function part2(input) {
  const thebest = input.map((problem) =>
    getBest({
      ...problem,
      prizex: problem.prizex * 10000000000000,
      prizey: problem.prizey * 10000000000000,
    })
  );

  console.log(thebest);

  return thebest.reduce(
    (sum, { total }) => sum + (total < Infinity ? total : 0),
    0
  );
}

console.log({
  part1: part1(toPOJO(inputs(1))), // 35574
  // part2: part2(toPOJO(inputs(1))),
});
