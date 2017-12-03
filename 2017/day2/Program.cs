using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace day2
{
    class Program
    {
        static int[][] readFile(string filename)
        {
            return File.ReadLines(filename)
            .Select((line) => line.Split("\t").Select(x => int.Parse(x)).ToArray())
            .ToArray();
        }

        static (int low, int high) MinMax((int low, int high) current, int val)
        {
            return (
                val <= current.low ? val : current.low,
                val >= current.high ? val : current.high
            );
        }

        static int FindDivisible(Stack<int> numbers)
        {
            if (numbers.TryPop(out int x))
            {
                int y = numbers.Where(i => x % i == 0).FirstOrDefault();
                return y != 0 ? x / y : FindDivisible(numbers);
            }
            return 0;
        }

        static void Main(string[] args)
        {
            var input = readFile("day2.txt");
            var part1 = input.Select(row => row.Aggregate((10000, 0), MinMax))
                             .Sum(pair => pair.Item2 - pair.Item1);
            Console.WriteLine(part1);

            var part2 = input.Select(row => new Stack<int>(row.OrderBy(i => i).ToArray()))
                            .Select(st => FindDivisible(st))
                            .Sum();
            Console.WriteLine(part2);
        }
    }
}
