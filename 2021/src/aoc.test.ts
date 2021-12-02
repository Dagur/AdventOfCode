import day1 from "./aoc/day1.ts";
import day2 from "./aoc/day2.ts";

describe("Day 1", () => {
  describe("Part 1", () => {
    test("example 1", async () => {
      const result = await day1.part1("/examples/day1.txt");
      expect(result).toEqual(7);
    });
    test("input 1", async () => {
      const result = await day1.part1("/inputs/day1.txt");
      expect(result).toEqual(1482);
    });
  });
  describe("Part 2", () => {
    test("example 1", async () => {
      const result = await day1.part2("/examples/day1.txt");
      expect(result).toEqual(5);
    });
    test("input 1", async () => {
      const result = await day1.part2("/inputs/day1.txt");
      expect(result).toEqual(1518);
    });
  });
});

describe("Day 2", () => {
  describe("Part 1", () => {
    test("example 1", async () => {
      const result = await day2.part1("/examples/day2.txt");
      expect(result).toEqual(150);
    });
    test("input 1", async () => {
      const result = await day2.part1("/inputs/day2.txt");
      expect(result).toEqual(1728414);
    });
  });
  describe("Part 2", () => {
    test("example 1", async () => {
      const result = await day2.part2("/examples/day2.txt");
      expect(result).toEqual(900);
    });
    test("input 1", async () => {
      const result = await day2.part2("/inputs/day2.txt");
      expect(result).toEqual(1765720035);
    });
  });
});
