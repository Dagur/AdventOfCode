const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = "Time:      7  15   30\nDistance:  9  40  200";

function toArray(content) {
  const [times, distances] = content
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1).map(Number));

  return { times, distances };
}

function toSingleRace(content) {
  const [times, distances] = content
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1).join(""))
    .map(Number);

  return { times: [times], distances: [distances] };
}

function setsRecord(press, time, record) {
  return time * press - press ** 2 > record;
}

function race(input) {
  const { times, distances } = input;

  const results = [];
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    let count = 0;

    for (let j = 0; j < time; j++) {
      if (setsRecord(j, time, distance)) {
        count++;
      }
    }
    results.push(count);
  }

  return results.reduce((acc, x) => acc * x, 1);
}

console.log({
  example1: race(toArray(example1)),
  solution1: race(toArray(content)),
  example2: race(toSingleRace(example1)),
  solution2: race(toSingleRace(content)),
});
