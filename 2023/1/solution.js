const fs = require("fs");
const filename = "input.txt";
const example1 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
const example2 =
  "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";
// const example2 = "eightwothree";

const content = fs.readFileSync(process.cwd() + "/" + filename).toString();

function getSum(content) {
  return content
    .split("\n")
    .map((row) =>
      row.split("").reduce(
        ([first, last], char) => {
          const val = Number(char);
          if (!isNaN(val) && typeof val === "number") {
            return [typeof first === "number" ? first : val, val];
          }
          return [first, last];
        },
        [undefined, undefined]
      )
    )
    .map((vals) => parseInt(vals.join("")))
    .filter(Boolean)
    .reduce((x, y) => x + y, 0);
}

function replaceWithNumber(content) {
  const lu = {
    o: { n: { e: 1 } },
    t: { w: { o: 2 }, h: { r: { e: { e: 3 } } } },
    f: { o: { u: { r: 4 } }, i: { v: { e: 5 } } },
    s: { i: { x: 6 }, e: { v: { e: { n: 7 } } } },
    e: { i: { g: { h: { t: 8 } } } },
    n: { i: { n: { e: 9 } } },
  };

  let phrase = ""
  let phrase2 = ""
  let ret = "";
  let matches = [];
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    phrase += c;
    if (!isNaN(Number(c)) || c === "\n") {
      phrase2 += c
      if (c === "\n") {
        console.log(phrase, phrase2)
        phrase = phrase2 = "";
      }
      ret += c;
      matches = [];
    } else {
      matches = matches
        .map((match) => match?.[c])
        .concat(lu[c])
        .filter(Boolean);

      const val = matches.map((m) => Number(m)).find((n) => !isNaN(n));
      if (val) {
        phrase2 += val.toString();
        ret += val.toString();
        matches = [];
      }
    }
  }

  return ret || "\n";
}

const solution1 = getSum(content);
const solution2 = getSum(replaceWithNumber(content));

console.log({
  solution1,
  solution2,
});
