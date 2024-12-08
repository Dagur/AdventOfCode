const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(8, false);

function getPos(width, index) {
  return [index % width, Math.floor(index / width)];
}

function parseInput(input) {
  const width = input.indexOf("\n");
  const grid = input.replaceAll("\n", "");
  const height = grid.length / width;
  const antennas = grid.matchAll(/[^.]/g).reduce((acc, m) => {
    const pos = getPos(width, m.index);
    const char = m[0];
    if (acc[char]) {
      acc[char].push(pos);
    } else {
      acc[char] = [pos];
    }
    return acc;
  }, {});

  return {
    width,
    height,
    antennas: antennas,
  };
}

function getNodes({ width, height, antennas }, getAntinodes, includeAntennas) {
  const antinodes = [];
  const allPositions = [];
  for (const [char, positions] of Object.entries(antennas)) {
    allPositions.push(...positions.map(([x, y]) => `${x}-${y}`));
    if (positions.length === 1) {
      continue;
    }
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const p1 = positions[i];
        const p2 = positions[j];
        antinodes.push(getAntinodes(p1, p2, width, height));
      }
    }
  }

  let validNodes = includeAntennas
    ? antinodes.flat()
    : antinodes.flat().filter(([x, y]) => !allPositions.includes(`${x}-${y}`));

  return validNodes;
}

function part1() {
  const input = parseInput(inputs(1));

  function getAntinodes([x1, y1], [x2, y2], width, height) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return [
      [x1 + dx, y1 + dy],
      [x2 - dx, y2 - dy],
    ].filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height);
  }

  return getNodes(input, getAntinodes).length;
}

function part2() {
  const input = parseInput(inputs(1));

  function getAntinodes([x1, y1], [x2, y2], width, height) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    const nodes = [
      [x1, y1],
      [x2, y2],
    ];

    let [x, y] = [x1 + dx, y1 + dy];
    while (x >= 0 && x < width && y >= 0 && y < height) {
      nodes.push([x, y]);
      [x, y] = [x + dx, y + dy];
    }
    [x, y] = [x2 - dx, y2 - dy];
    while (x >= 0 && x < width && y >= 0 && y < height) {
      nodes.push([x, y]);
      [x, y] = [x - dx, y - dy];
    }

    return nodes;
  }

  return new Set(
    getNodes(input, getAntinodes, true).map(([x, y]) => `${x}-${y}`)
  ).size;
}

console.log({
  part1: part1(),
  part2: part2(),
});
