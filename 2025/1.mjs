import { createInputSelector } from "./util/inputSelector.mjs";
const inputs = createInputSelector(1, false);

function part1() {
  let zeros = 0;
  let position = 50;
  const rotations = inputs(1).split("\n");

  for (const instruction of rotations) {
    const direction = instruction[0];
    const distance = parseInt(instruction.substr(1));
    const movement = direction === "L" ? -distance : distance;
    position += movement;
    while (position < 0 || position > 99) {
      position = (position + 100) % 100;
    }
    if (position === 0) {
      zeros++;
    }
  }

  return zeros;
}

function part2() {
  let zeros = 0;
  let clicks = 0;
  let position = 50;
  const rotations = inputs(1).split("\n");

  for (const instruction of rotations) {
    const direction = instruction[0];
    const distance = parseInt(instruction.substr(1));
    const movement = direction === "L" ? -1 : 1;

    for (let i = 0; i < distance; i++) {
      position += movement;

      if (position === 0) {
        clicks++;
      } else if (position === -1) {
        position = 99;
      } else if (position === 100) {
        position = 0;
        clicks++;
      }
    }
    if (position === 0) {
      zeros++;
      clicks--;
    }
  }

  return clicks + zeros;
}

console.log({
  part1: part1(),
  part2: part2(),
});
