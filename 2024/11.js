const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(11, false);

function blink(stones) {
  const out = [];
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

let cache = new Map();
function storeAndReturn(key, val) {
  cache.set(key, val);
  return val;
}

function blinkDepthFirst(stone, level) {
  if (level === 0) {
    return 1;
  }
  const signature = `${stone}-${level}`;
  if (cache.has(signature)) {
    return cache.get(signature);
  }
  if (stone === 0) {
    return storeAndReturn(signature, blinkDepthFirst(1, level - 1));
  }
  const str = String(stone);
  const len = str.length;
  if (len % 2 === 0) {
    const split = Math.ceil(len / 2);
    const stoneA = Number(str.substr(0, split));
    const stoneB = Number(str.substr(split));
    return (
      blinkDepthFirst(stoneA, level - 1) + blinkDepthFirst(stoneB, level - 1)
    );
  }

  const newStone = stone * 2024;
  return storeAndReturn(signature, blinkDepthFirst(newStone, level - 1));
}

function part2(input, blinkTimes) {
  let stones = input.split(" ").map(Number);
  let sum = 0;
  for (stone of stones) {
    sum += blinkDepthFirst(stone, blinkTimes);
  }

  return sum;
}

console.log({
  part1: part1(inputs(1), 25),
  part2: part2(inputs(1), 75),
});
