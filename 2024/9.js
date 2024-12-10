const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(9, false);

function toId(num) {
  return String.fromCharCode(num + 48);
}

function fromId(id) {
  return id === "." ? 0 : id.charCodeAt(0) - 48;
}

function expand(input) {
  return input
    .matchAll(/(\d{1,2})/g)
    .map((m) => m[0].split("").map(Number))
    .reduce((repr, [file, freespace], i) => {
      return repr + toId(i).repeat(file) + ".".repeat(freespace);
    }, "");
}

function getChecksum(defragged) {
  return defragged.reduce((sum, id, index) => sum + fromId(id) * index, 0);
}

function part1(input) {
  const repr = expand(input);
  const { freespaces, chars } = repr.split("").reduce(
    (acc, m, i) => {
      const c = m[0];
      if (c === ".") {
        acc.freespaces.push(i);
      } else {
        acc.chars.push(c);
      }
      return acc;
    },
    { freespaces: [], chars: [] }
  );

  const defragged = freespaces
    .reduce((frag, index) => frag.with(index, chars.pop()), repr.split(""))
    .slice(0, -freespaces.length);

  return getChecksum(defragged);
}

function part2(input) {
  const repr = expand(input);
  const freespaces = [];
  const chars = [];

  let lastChar;
  let charCount = 0;
  for (let i = 0; i <= repr.length; i++) {
    const c = repr[i];
    if (i === 0) {
      lastChar = c;
      charCount = 1;
    } else if (c === lastChar) {
      charCount++;
    } else {
      if (lastChar === ".") {
        freespaces.push([i - charCount, charCount]);
      } else {
        chars.unshift([lastChar, i - charCount, charCount]);
      }
      lastChar = c;
      charCount = 1;
    }
  }

  let defragged = repr.split("");
  for (const [char, charStart, count] of chars) {
    const index = freespaces.findIndex((s) => s[1] >= count);
    if (index > -1) {
      const [spaceStart, spaceCount] = freespaces.at(index);
      if (charStart <= spaceStart) {
        continue;
      }
      for (let i = 0; i < count; i++) {
        defragged[spaceStart + i] = char;
        defragged[charStart + i] = ".";
      }
      const roomLeft = spaceCount - count;
      if (roomLeft > 0) {
        freespaces[index] = [spaceStart + count, roomLeft];
      } else {
        freespaces.splice(index, 1);
      }
    }
  }

  return getChecksum(defragged);
}

console.log({
  part1: part1(inputs(1)),
  part2: part2(inputs(1)),
});
