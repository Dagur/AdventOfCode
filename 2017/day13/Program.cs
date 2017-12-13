using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace day13
{
    class Program
    {
        static int GetScannerPosition(int range, int pico)
        {
            return Enumerable.Range(0, range)
                .Concat(Enumerable.Range(1, range - 2).Reverse())
                .ElementAt(pico % (2 * range - 2));
        }

        static int GetSeverity(Dictionary<int, int> input, int delay = 0)
        {
            return Enumerable.Range(0, input.Keys.Max() + 1).Select(p =>
                input.ContainsKey(p) && GetScannerPosition(input[p], p + delay) == 0 ? (p + delay) * input[p] : 0
            ).Sum();
        }
        static void Main(string[] args)
        {
            var input = File.ReadLines("input.txt")
                .Select(line => line.Split(": "))
                .ToDictionary(p => Int32.Parse(p[0]), p => Int32.Parse(p[1]));

            var part1 = GetSeverity(input);
            Console.WriteLine(part1);

            // part2
            var delay = 0;
            while (GetSeverity(input, delay) != 0)
            {                
                delay++;
            }
            Console.WriteLine(delay);
        }
    }
}
