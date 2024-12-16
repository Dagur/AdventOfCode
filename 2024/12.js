const { createInputSelector } = require("./util/inputSelector.js");
const inputs = createInputSelector(12, false);

function toGarden(input) {
  const width = input.indexOf("\n");
  const garden = input.replaceAll("\n", "");
  const height = garden.length / width;
  return {
    width,
    height,
    garden,
  };
}

function getRegions(width, garden) {
  function move(plot, direction) {
    switch (direction) {
      case "up":
        return plot - width;
      case "right":
        return plot + 1;
      case "down":
        return plot + width;
      case "left":
        return plot - 1;
    }
  }

  function crawl(path, char) {
    const start = path.at(-1);

    let plot = move(start, "up");
    if (garden[plot] === char && !path.includes(plot)) {
      path.push(plot);
      crawl(path, char);
    }
    plot = move(start, "right");
    if (plot % width !== 0 && garden[plot] === char && !path.includes(plot)) {
      path.push(plot);
      crawl(path, char);
    }

    plot = move(start, "down");
    if (garden[plot] === char && !path.includes(plot)) {
      path.push(plot);
      crawl(path, char);
    }
    plot = move(start, "left");
    if (start % width !== 0 && garden[plot] === char && !path.includes(plot)) {
      path.push(plot);
      crawl(path, char);
    }

    return path;
  }

  const regions = [];
  for (let i = 0; i < garden.length; i++) {
    if (!regions.some((s) => s.includes(i))) {
      regions.push(crawl([i], garden.at(i)));
    }
  }
  return regions;
}

function part1({ width, height, garden }) {
  function getPrice(region) {
    const area = region.length;
    const perimeter = region.reduce((total, plot) => {
      if (!region.includes(plot - width)) {
        total += 1;
      }
      if ((plot + 1) % width === 0 || !region.includes(plot + 1)) {
        total += 1;
      }
      if (!region.includes(plot + width)) {
        total += 1;
      }
      if (plot % width === 0 || !region.includes(plot - 1)) {
        total += 1;
      }
      return total;
    }, 0);

    return area * perimeter;
  }

  const regions = getRegions(width, garden);
  const prices = regions.map(getPrice);
  return prices.reduce((sum, price) => sum + price, 0);
}

function part2({ width, height, garden }) {
  function getPrice(region) {
    const area = region.length;
    const sides = region.reduce((total, plot) => {
      let corners = 0;
      const sides = [];
      if (!region.includes(plot - width)) {
        sides.push("N");
      }
      if ((plot + 1) % width === 0 || !region.includes(plot + 1)) {
        if (sides.includes("N")) {
          corners += 1;
        }
        if ((plot + 1) % width !== 0) {
          if (
            region.includes(plot + 1 + width) &&
            region.includes(plot + width)
          ) {
            corners += 1;
          }
          if (
            region.includes(plot + 1 - width) &&
            region.includes(plot - width)
          ) {
            corners += 1;
          }
        }
        sides.push("E");
      }
      if (!region.includes(plot + width)) {
        if (sides.includes("E")) {
          corners += 1;
        }
        sides.push("S");
      }
      if (plot % width === 0 || !region.includes(plot - 1)) {
        if (sides.includes("N")) {
          corners += 1;
        }
        if (sides.includes("S")) {
          corners += 1;
        }

        if (plot % width !== 0) {
          if (
            region.includes(plot - 1 + width) &&
            region.includes(plot + width)
          ) {
            corners += 1;
          }
          if (
            region.includes(plot - 1 - width) &&
            region.includes(plot - width)
          ) {
            corners += 1;
          }
        }

        sides.push("W");
      }

      return total + corners;
    }, 0);

    return area * sides;
  }

  const regions = getRegions(width, garden);
  const prices = regions.map(getPrice);
  return prices.reduce((sum, price) => sum + price, 0);
}

console.log({
  part1: part1(toGarden(inputs(1))),
  part2: part2(toGarden(inputs(1))),
});
