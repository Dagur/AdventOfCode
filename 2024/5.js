const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(5, false);

function getUpdates() {
  const [, updatetxt] = inputs(1).split("\n\n");
  return updatetxt.split("\n").map((line) => line.split(","));
}

function getRules() {
  const [ruletxt] = inputs(1).split("\n\n");
  const rules = ruletxt.split("\n").map((line) => line.split("|"));
  const befores = Object.groupBy(rules, (line) => line[0]);
  const keys = Array.from(new Set(rules.flatMap((line) => line)));

  return keys.reduce(
    (acc, key) => acc.set(key, befores[key]?.map((kv) => kv[1]) ?? []),
    new Map()
  );
}

function validate(update, rules) {
  for (let i = 0; i < update.length; i++) {
    const val = update[i];
    for (let j = i + 1; j < update.length; j++) {
      const check = update[j];
      if (!rules.get(val).includes(check)) {
        return j;
      }
    }
  }
  return true;
}

function sort(update, rules) {
  let validation = validate(update, rules);

  do {
    update = update
      .with(validation, update[validation - 1])
      .with(validation - 1, update[validation]);
    validation = validate(update, rules);
  } while (validation !== true);

  return update;
}

function part1(rules, updates) {
  return updates.reduce(
    (answer, update) =>
      answer +
      (validate(update, rules) === true
        ? Number(update[Math.floor(update.length / 2)])
        : 0),
    0
  );
}

function part2(rules, updates) {
  const invalids = updates.filter((update) => validate(update, rules) !== true);
  const sorted = invalids.map((update) => sort(update, rules));

  return sorted.reduce(
    (answer, update) => answer + Number(update[Math.floor(update.length / 2)]),
    0
  );
}

const rules = getRules();
const updates = getUpdates();
console.log({
  part1: part1(rules, updates),
  part2: part2(rules, updates),
});
