const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();

const example1 = [
  "seeds: 79 14 55 13",
  "",
  "seed-to-soil map:",
  "50 98 2",
  "52 50 48",
  "",
  "soil-to-fertilizer map:",
  "0 15 37",
  "37 52 2",
  "39 0 15",
  "",
  "fertilizer-to-water map:",
  "49 53 8",
  "0 11 42",
  "42 0 7",
  "57 7 4",
  "",
  "water-to-light map:",
  "88 18 7",
  "18 25 70",
  "",
  "light-to-temperature map:",
  "45 77 23",
  "81 45 19",
  "68 64 13",
  "",
  "temperature-to-humidity map:",
  "0 69 1",
  "1 0 69",
  "",
  "humidity-to-location map:",
  "60 56 37",
  "56 93 4",
].join("\n");

function getSeeds(content) {
  return content.split("\n")[0].split(": ")[1].split(" ").map(Number);
}

function getMaps(content) {
  const mapText = content.split("\n\n").slice(1);
  return mapText.map((line) => {
    const [name, specsText] = line.split(" map:\n");
    return specsText.split("\n").map((line) => line.split(" ").map(Number));
  });
}

function map(value, spec) {
  for (let i = 0; i < spec.length; i++) {
    const [dest, src, range] = spec[i];
    if (value >= src && value < src + range) {
      return dest + value - src;
    }
  }
  return value;
}

function solve(content) {
  const seeds = getSeeds(content);
  const maps = getMaps(content);

  const values = maps.reduce((vals, spec) => {
    return vals.map((val) => map(val, spec));
  }, seeds);

  return Math.min.apply(this, values);
}

function* generateVals(seeds) {
  for (let i = 0; i < seeds.length / 2; i++) {
    const start = seeds.shift();
    const range = seeds.shift();
    for (let j = start; j < start + range; j++) {
      yield j;
    }
  }
}

function* loop(vals, spec) {
  for (const val of vals) {
    yield map(val, spec);
  }
}

function solve2(content) {
  const seeds = getSeeds(content);
  let vals = generateVals(seeds);
  const maps = getMaps(content);

  for (let i = 0; i < maps.length; i++) {
    const spec = maps[i];
    vals = loop(vals, spec);
  }

  let min = vals.next().value;
  for (const val of vals) {
    min = Math.min(min, val);
  }

  return min;
}

console.log({
  example1: solve(example1),
  solution1: solve(content),
  "example1-2": solve2(example1),
  solution2: solve2(content), // Very slow
});
