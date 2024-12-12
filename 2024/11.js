const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(11, false);

function blink(stones) {
  const out = []
  const len = stones?.length ?? 0;
  for (let i = 0; i < len; i++) {
    const stone = stones[i];
    if (stone === 0) {
      out.push(1);
      continue;
    }
    const str = String(stone);
    const len = str.length;
    if (len % 2 === 0) {
      const split = Math.ceil(len / 2);
      out.push(Number(str.substr(0, split)));
      out.push(Number(str.substr(split)));
      continue;
    }

    out.push(stone * 2024);
  }
  return out;
}

function part1(input, blinkTimes) {
  let stones = input.split(" ").map(Number);
  for (let i = 0; i < blinkTimes; i++) {
    stones = blink(stones);
  }

  return stones?.length;
}


console.log({
  part1: part1(inputs(1), 25),
});
