using System;
using System.Linq;
using System.Collections.Generic;

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
            var lengths = new int[] { 206, 63, 255, 131, 65, 80, 238, 157, 254, 24, 133, 2, 16, 0, 1, 3 };
            var start = new Knot
            {
                list = Enumerable.Range(0, 256).ToList(),
                pos = 0,
                skip = 0
            };

            var part1 = lengths.Aggregate(start, Step);
            Console.WriteLine(part1.list[0] * part1.list[1]);

        }
    }
}
