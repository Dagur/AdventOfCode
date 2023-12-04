const fs = require("fs");
const filename = "input.txt";
const example1 = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
const example2 =
  "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";

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

  let ret = "";
  let matches = [];
  for (let i = 0; i < content.length; i++) {
    const c = content[i];
    if (!isNaN(Number(c)) || c === "\n") {
      ret += c;
      matches = [];
    } else {
      matches = matches
        .map((match) => match?.[c])
        .concat(lu[c])
        .filter(Boolean);

      const index = matches.findIndex((m) => !isNaN(Number(m)));
      if (index > -1) {
        ret += matches[index];
        matches.splice(index, 1);
      }
    }
  }

  return ret;
}

console.log({
  solution1: getSum(content),
  solution2: getSum(replaceWithNumber(content)),
});
