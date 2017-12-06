using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace day6
{
    class Program
    {
        static IEnumerable<int> ReadFile(string filename) =>
            File.ReadLines(filename).First().Split("\t").Select(x => Int32.Parse(x));

        static int ChooseBlock(int[] blocks) =>
            Array.FindIndex(blocks, block => block == blocks.Max());

        static int[] Redistribute(int[] blocks, int index)
        {
            var val = blocks[index];
            var noBlocks = blocks.Length;
            var newblocks = blocks.ToArray();
            newblocks[index] = 0;

            return Enumerable.Range(index + 1, val).Aggregate(newblocks, (b, i) =>
            {
                b[i % noBlocks] += 1;
                return b;
            });

        }
        static void Main(string[] args)
        {
            var input = ReadFile("input.txt").ToArray();
            var history = new List<int[]> { input };
            var stepCount = 1;

            while (true)
            {
                var blocks = history.Last();
                var configuration = Redistribute(blocks, ChooseBlock(blocks));
                if (history.Any(config => config.SequenceEqual(configuration)))
                {
                    var firstOcurrence = history.FindIndex(config => config.SequenceEqual(configuration));
                    Console.WriteLine($"Part 1: {stepCount}");
                    Console.WriteLine($"Part 2: {stepCount - firstOcurrence}");
                    break;
                }
                history.Add(configuration);
                stepCount++;
            }
        }
    }
}
