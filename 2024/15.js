const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(15, false);

function parseInput(input, wide = false) {
  let [map, pattern] = input.split("\n\n");
  let width = map.indexOf("\n");
  map = map.replaceAll("\n", "");
  const height = map.length / width;
  const walls = [];
  const boxes = [];
  let startPos;
  let index = 0;
  map.split("").forEach((c, i) => {
    index = wide ? i * 2 : i;
    switch (c) {
      case "#":
        walls.push(index);
        if (wide) {
          walls.push(index + 1);
        }
        break;
      case "O":
        if (wide) {
          boxes.push([index, index + 1]);
        } else {
          boxes.push(index);
        }
        break;
      case "@":
        startPos = index;
        break;
    }
  });

  pattern = pattern.replaceAll("\n", "").split("");

  return {
    width: wide ? width * 2 : width,
    height,
    walls,
    boxes,
    startPos,
    pattern,
  };
}

function print(pos, width, height, walls, boxes, isWide = false) {
  const size = width * height;
  let map = ".".repeat(size).split("");
  if (isWide) {
    boxes.forEach(([lindex, rindex]) => {
      map[lindex] = "[";
      map[rindex] = "]";
    });
  } else {
    boxes.forEach((index) => (map[index] = "O"));
  }
  walls.forEach((index) => (map[index] = "#"));
  map[pos] = "@";

  for (let i = 0; i < size; i += width) {
    console.log(map.slice(i, i + width).join(""));
  }
}

function getTarget(pos, instruction, width) {
  switch (instruction) {
    case "^":
      return pos - width;
    case ">":
      return pos + 1;
    case "v":
      return pos + width;
    case "<":
      return pos - 1;
  }
}

function getGPS(boxes, width, height) {
  return boxes.reduce((sum, index) => {
    const x = index % width;
    const y = Math.floor(index / width);
    return sum + (100 * y + x);
  }, 0);
}

function part1({ width, height, walls, boxes, startPos, pattern }) {
  function move(pos, target, instruction, isBox = false) {
    if (walls.includes(target)) {
      return false;
    } else if (boxes.includes(target)) {
      const next = getTarget(target, instruction, width);
      if (!move(target, next, instruction, true)) {
        return false;
      }
    }
    boxes = boxes.filter((x) => x !== pos).concat([target]);
    return true;
  }

  let pos = startPos;
  for (const instruction of pattern) {
    const target = getTarget(pos, instruction, width);
    if (move(pos, target, instruction)) {
      pos = target;
      boxes = boxes.filter((x) => x !== pos);
    }
  }
  // print(startPos, width, height, walls, boxes);
  return getGPS(boxes, width, height);
}

function part2({ width, height, walls, boxes, startPos, pattern }) {
  function checkPossibleMove(upOrDown, blockingBox) {
    const modifier = upOrDown === "up" ? -width : width;
    const positions = [blockingBox[0] + modifier, blockingBox[1] + modifier];

    if (walls.includes(positions[0]) || walls.includes(positions[1])) {
      return false;
    }
    const otherBoxes = boxes.filter(
      (b) => b.includes(positions[0]) || b.includes(positions[1])
    );
    if (otherBoxes) {
      return otherBoxes.every((b) => checkPossibleMove(upOrDown, b));
    }

    return true;
  }

  function move(pos, target, instruction, isBox = false) {
    if (walls.includes(target)) {
      return false;
    }
    const blockingBox = boxes.find((b) => b.includes(target));
    if (blockingBox) {
      switch (instruction) {
        case "<":
          {
            const next = getTarget(blockingBox[0], instruction, width);
            if (!move(blockingBox[0], next, instruction, true)) {
              return false;
            }
            boxes = boxes
              .filter((b) => b !== blockingBox)
              .concat([[blockingBox[0] - 1, blockingBox[0]]]);
          }
          break;
        case ">":
          {
            const next = getTarget(blockingBox[1], instruction, width);
            if (!move(blockingBox[1], next, instruction, true)) {
              return false;
            }
            boxes = boxes
              .filter((b) => b !== blockingBox)
              .concat([[blockingBox[1], blockingBox[1] + 1]]);
          }
          break;
        case "^":
          {
            const possible = checkPossibleMove("up", blockingBox);
            if (!possible) {
              return false;
            }
            const ma = move(
              blockingBox[0],
              getTarget(blockingBox[0], instruction, width),
              instruction,
              true
            );
            const mb = move(
              blockingBox[1],
              getTarget(blockingBox[1], instruction, width),
              instruction,
              true
            );
            boxes = boxes
              .filter((b) => b !== blockingBox)
              .concat([[blockingBox[0] - width, blockingBox[1] - width]]);
          }
          break;
        case "v":
          {
            const possible = checkPossibleMove("down", blockingBox);
            if (!possible) {
              return false;
            }
            const ma = move(
              blockingBox[0],
              getTarget(blockingBox[0], instruction, width),
              instruction,
              true
            );
            const mb = move(
              blockingBox[1],
              getTarget(blockingBox[1], instruction, width),
              instruction,
              true
            );
            boxes = boxes
              .filter((b) => b !== blockingBox)
              .concat([[blockingBox[0] + width, blockingBox[1] + width]]);
          }
          break;
      }
    }
    return true;
  }

  let pos = startPos;
  for (const instruction of pattern) {
    const target = getTarget(pos, instruction, width);
    if (move(pos, target, instruction)) {
      pos = target;
    }
  }
  // print(pos, width, height, walls, boxes, true);

  return getGPS(
    boxes.map((b) => b[0]),
    width,
    height
  );
}

console.log({
  part1: part1(parseInput(inputs(1))),
  part2: part2(parseInput(inputs(1), true)),
});
