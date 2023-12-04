const fs = require("fs");
const filename = "input.txt";
const example1 = [
  "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
  "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
  "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
  "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
  "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
].join("\n");

const content = fs.readFileSync(process.cwd() + "/" + filename).toString();
const input = toArray(content).filter(game => game.length > 0);

function toArray(input) {
  return input.split("\n").map((row) => {
    if (!row) {
      return [];
    }
    const [game, rest] = row.split(": ");
    const id = Number(game.substr(5));
    const sets = rest.split("; ").map(
      (set) =>
        new Map(
          set
            .split(", ")
            .map((ball) => ball.split(" "))
            .map(([count, color]) => [color, Number(count)])
        )
    );
    return sets;
  });
}

function checkGame(game) {
  const red = 12;
  const green = 13;
  const blue = 14;

  return (
    (game.get("red") ?? 0) <= red &&
    (game.get("green") ?? 0) <= green &&
    (game.get("blue") ?? 0) <= blue
  );
}

function sumPossible(games) {
  return games
    .map((sets, id) => {
      const possible = sets.reduce((acc, game) => acc && checkGame(game), true);
      return possible ? id + 1 : 0;
    })
    .reduce((acc, i) => acc + i, 0);
}

function findPower(games) {
  let power = 0;
  for (let i = 0; i < games.length; i++) {
    const sets = games[i];
    let redMin = greenMin = blueMin = 0;
    for (let j = 0; j < sets.length; j++) {
      const set = sets[j];
      redMin = Math.max(set.get("red") ?? 0, redMin);
      greenMin = Math.max(set.get("green") ?? 0, greenMin);
      blueMin = Math.max(set.get("blue") ?? 0, blueMin);
    }
    power += redMin * greenMin * blueMin;
  }
  return power;
}

console.log({
  solutionExample1: sumPossible(toArray(example1)),
  solution1: sumPossible(input),
  solutionExample2: findPower(toArray(example1)),
  solution2: findPower(input),
});
