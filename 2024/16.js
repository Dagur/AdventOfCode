const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(16, false);

function parseInput(input) {
  const width = input.indexOf("\n");
  const map = input.replaceAll("\n", "");
  const height = map.length / width;

  return {
    width,
    height,
    map,
    start: map.indexOf("S"),
    end: map.indexOf("E"),
  };
}

function part1({ width, height, map, start, end }) {
  let pos = start;

  function* getOptions(pos, path) {
    const possibilities = [
      ["W", pos - 1],
      ["E", pos + 1],
      ["N", pos - width],
      ["S", pos + width],
    ];
    for (const [direction, index] of possibilities) {
      if (index !== start && map[index] !== "#" && !path.includes(index)) {
        yield direction;
      }
    }
  }

  let lowestScore = Infinity;

  function travel(pos, facing, path, turns) {
    // console.log({
    //   pos,
    //   path,
    // });
    const score = turns * 1000 + path.length;
    if (score > lowestScore) {
      return;
    }
    if (pos === end) {
      // console.log({
      //   turns,
      //   steps: path.length,
      //   score,

      // })
      if (score < lowestScore) {
        lowestScore = score;
      }
    }
    const options = getOptions(pos, path);
    let direction = options.next();
    while (!direction.done) {
      let nextpos;
      switch (direction.value) {
        case "N":
          nextpos = pos - width;
          break;
        case "E":
          nextpos = pos + 1;
          break;
        case "S":
          nextpos = pos + width;
          break;
        case "W":
          nextpos = pos - 1;
          break;
      }
      travel(
        nextpos,
        direction.value,
        path.concat([pos]),
        turns + (direction.value === facing ? 0 : 1)
      );
      direction = options.next();
    }
  }

  travel(start, "E", [], 0);
  return lowestScore;
}

console.log({
  part1: part1(parseInput(inputs(1))),
});
