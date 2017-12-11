using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace day10
{
    class Program
    {
        struct Knot
        {
            public List<int> list;
            public int skip;
            public int pos;
        }

        static List<int> Reverse(List<int> list, int pos, int length)
        {
            if (length == 1) return list;
            var indexes = Enumerable.Range(pos, length).Select(i => i % list.Count()).ToList();
            var reversedValues = indexes
                .Zip(Enumerable.Reverse(indexes.Select(i => list[i])).ToArray(), (i, v) => (i, v))
                .ToDictionary(((int i, int v) p) => p.i, p => p.v);
            return list.Select((val, i) => indexes.Contains(i) ? reversedValues[i] : val).ToList();
        }

        static Knot Step(Knot knot, int length)
        {
            return new Knot
            {
                list = Reverse(knot.list, knot.pos, length),
                pos = (knot.pos + length + knot.skip) % knot.list.Count(),
                skip = knot.skip + 1
            };
        }
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt");
            int[] lengths = input.Split(',').Select(x => Int32.Parse(x)).ToArray();
            var start = new Knot
            {
                list = Enumerable.Range(0, 256).ToList(),
                pos = 0,
                skip = 0
            };

            var part1 = lengths.Aggregate(start, Step);
            Console.WriteLine(part1.list[0] * part1.list[1]);

            var chars = Encoding.ASCII.GetBytes(input.ToCharArray()).Concat(new Byte[] { 17, 31, 73, 47, 23 });
            start = new Knot
            {
                list = Enumerable.Range(0, 256).ToList(),
                pos = 0,
                skip = 0
            };
            var sparse = Enumerable.Range(0, 64).Aggregate(start, (knot, _) => chars.Select(c => (int)c).Aggregate(knot, Step)).list;
            var dense = Enumerable.Range(0, 16).Select(set => Enumerable.Range(set * 16, 16).Aggregate(0, (a, b) => a ^ sparse[b]));
            var part2 = string.Concat(dense.Select(dec => dec.ToString("X").PadLeft(2, '0')));
            Console.WriteLine(part2);
        }
    }
}
