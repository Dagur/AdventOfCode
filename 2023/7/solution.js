const fs = require("fs");
const filename = "input.txt";
const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const example1 = [
  "32T3K 765",
  "T55J5 684",
  "KK677 28",
  "KTJJT 220",
  "QQQJA 483",
].join("\n");

function toArray(content) {
  return content
    .split("\n")
    .map((line) => line.split(" "))
    .filter((p) => p[0])
    .map(([hand, bet]) => [hand, Number(bet)]);
}

function sortHands(hands) {
  function getVal(c) {
    switch (c) {
      case "A":
        return 14;
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "T":
        return 10;
      default:
        return Number(c);
    }
  }

  function comparator(a, b) {
    let i = 0;
    while (i < 5) {
      const vala = getVal(a[0][i]);
      const valb = getVal(b[0][i]);

      if (vala < valb) {
        return 1;
      }
      if (vala > valb) {
        return -1;
      }
      i++;
    }
    return 0;
  }
  return hands.sort(comparator);
}

function getTypes(input) {
  const ret = {
    fiveoak: [],
    fouroak: [],
    fullhouse: [],
    threeoak: [],
    twopair: [],
    pair: [],
    highcard: [],
  };
  for (const [hand] of input) {
    const values = new Array(13).fill(0);
    for (let i = 0; i < 5; i++) {
      switch (hand[i]) {
        case "A":
          values[0]++;
          break;
        case "K":
          values[1]++;
          break;
        case "Q":
          values[2]++;
          break;
        case "J":
          values[3]++;
          break;
        case "T":
          values[4]++;
          break;
        case "9":
          values[5]++;
          break;
        case "8":
          values[6]++;
          break;
        case "7":
          values[7]++;
          break;
        case "6":
          values[8]++;
          break;
        case "5":
          values[9]++;
          break;
        case "4":
          values[10]++;
          break;
        case "3":
          values[11]++;
          break;
        case "2":
          values[12]++;
          break;
      }
    }
    const multiples = values.filter((x) => x > 1);
    if (multiples.length === 1) {
      switch (multiples[0]) {
        case 5:
          ret.fiveoak.push(hand);
          break;
        case 4:
          ret.fouroak.push(hand);
          break;
        case 3:
          ret.threeoak.push(hand);
          break;
        case 2:
          ret.pair.push(hand);
          break;
      }
    } else if (multiples.length === 2) {
      if (multiples.find((x) => x === 3)) {
        ret.fullhouse.push(hand);
      } else {
        ret.twopair.push(hand);
      }
    } else {
      ret.highcard.push(hand);
    }
  }

  return ret;
}

function calculateWinnings(input, types) {
  const bets = new Map(input);
  let multiplier = input.length;
  let winnings = 0;
  for (const type of [
    "fiveoak",
    "fouroak",
    "fullhouse",
    "threeoak",
    "twopair",
    "pair",
    "highcard",
  ]) {
    const hands = types[type];
    for (let i = 0; i < hands.length; i++) {
      winnings += bets.get(hands[i]) * multiplier--;
    }
  }

  // console.log({multiplier})
  return winnings;
}

function solve(content) {
  const input = toArray(content);
  const types = getTypes(sortHands(input));
  console.log(types);
  return calculateWinnings(input, types);
}

console.log({
  example1: solve(example1),
  solution1: solve(content),
});
