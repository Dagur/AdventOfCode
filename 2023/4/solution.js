const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = [
  "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
  "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
  "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
  "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
  "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
  "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
].join("\n");
const input = toArray(content);

function toArray(content) {
  return content
    .split("\n")
    .map((line) => line.trim().split(": "))
    .filter((line) => line[1])
    .map(([, cards]) => {
      const [winning, mine] = cards.split(" | ");
      return [
        winning.trim().split(/\s+/).map(Number).sort(),
        mine.trim().split(/\s+/).map(Number).sort(),
      ];
    });
}

function calculatePoints(input) {
  return input.reduce((acc, cards) => {
    const vals = cards.flat().sort();
    let matches = 0;
    for (let i = 1; i < vals.length; i++) {
      if (vals[i - 1] - vals[i] === 0) {
        if (matches) {
          matches *= 2;
        } else {
          matches = 1;
        }
      }
    }
    return acc + matches;
  }, 0);
}

function countCards(input) {
  const tickets = Object.fromEntries(
    new Array(input.length).fill(0).map((_, i) => [i + 1, 1])
  );

  for (let i = 0; i < input.length; i++) {
    const cardNumber = i + 1;
    if (!tickets[cardNumber]) {
      break;
    }
    const vals = input[i].flat().sort();
    let matches = 0;
    for (let j = 1; j < vals.length; j++) {
      if (vals[j - 1] - vals[j] === 0) {
        matches += 1;
      }
    }
    for (let t = cardNumber + 1; t <= cardNumber + matches; t++) {
      tickets[t] += 1 * tickets[cardNumber];
    }
  }

  return Object.values(tickets).reduce((acc, val) => acc + val);
}

console.log({
  example1: calculatePoints(toArray(example1)),
  example2: countCards(toArray(example1)),
  solution1: calculatePoints(input),
  solution2: countCards(input),
});
