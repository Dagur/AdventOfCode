const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = [
  "LLR",
  "",
  "AAA = (BBB, BBB)",
  "BBB = (AAA, ZZZ)",
  "ZZZ = (ZZZ, ZZZ)",
  "",
].join("\n");
const example2 = [
  "LR",
  "",
  "11A = (11B, XXX)",
  "11B = (XXX, 11Z)",
  "11Z = (11B, XXX)",
  "22A = (22B, XXX)",
  "22B = (22C, 22C)",
  "22C = (22Z, 22Z)",
  "22Z = (22B, 22B)",
  "XXX = (XXX, XXX)",
  "",
].join("\n");

function getInstructions(content) {
  return content.split("\n")[0];
}

function getMap(content) {
  const arr = content
    .split("\n")
    .slice(2)
    .map((line) => {
      if (!line) {
        return null;
      }
      const [key, vals] = line.replace(")", "").split(" = (");
      const dests = vals.split(", ");
      return [key, dests];
    })
    .filter(Boolean);
  return new Map(arr);
}

function walk(content) {
  const instructions = getInstructions(content);
  const map = getMap(content);
  let pos = "AAA";
  let steps = 0;
  while (pos !== "ZZZ") {
    const idx = steps % instructions.length;
    if (instructions[idx] === "L") {
      pos = map.get(pos)[0];
    } else {
      pos = map.get(pos)[1];
    }
    steps++;
  }
  return steps;
}

function ghostWalk(content) {
  const instructions = getInstructions(content);
  const map = getMap(content);
  let positions = content
    .split("\n")
    .filter((line) => line[2] === "A")
    .map((line) => line.slice(0, 3));
  let steps = 0;
  while (positions.some(pos => pos[2] !== "Z")) {
    const idx = steps % instructions.length;
    const instruction = instructions[idx];
    // console.log({
    //   positions,
    //   instruction
    // })
    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];
      if (instruction === "L") {
        positions[i] = map.get(pos)[0];
      } else {
        positions[i] = map.get(pos)[1];
      }
    }
    steps++;
  }
  // console.log({ positions })
  return steps;
}

console.log({
  example1: walk(example1),
  solution1: walk(content),
  example2: ghostWalk(example2),
  solution2: ghostWalk(content),
});

// After examining the maps a bit longer, your attention is drawn to a curious fact:
// the number of nodes with names ending in A is equal to the number ending in Z!
// If you were a ghost, you'd probably just start at every node that ends with A
//  and follow all of the paths at the same time until they all simultaneously end
//  up at nodes that end with Z.

// For example:

// LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)
// Here, there are two starting nodes, 11A and 22A (because they both end with A).
// As you follow each left/right instruction, use that instruction to simultaneously
// navigate away from both nodes you're currently on. Repeat this process until all
// of the nodes you're currently on end with Z. (If only some of the nodes you're on
// end with Z, they act like any other node and you continue as normal.) In this
// example, you would proceed as follows:

// Step 0: You are at 11A and 22A.
// Step 1: You choose all of the left paths, leading you to 11B and 22B.
// Step 2: You choose all of the right paths, leading you to 11Z and 22C.
// Step 3: You choose all of the left paths, leading you to 11B and 22Z.
// Step 4: You choose all of the right paths, leading you to 11Z and 22B.
// Step 5: You choose all of the left paths, leading you to 11B and 22C.
// Step 6: You choose all of the right paths, leading you to 11Z and 22Z.
// So, in this example, you end up entirely on nodes that end in Z after 6 steps.

// Simultaneously start on every node that ends with A. How many steps does it take
//  before you're only on nodes that end with Z?
