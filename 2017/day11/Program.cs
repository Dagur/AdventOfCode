using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace day11
{
    class Program
    {
        struct Hex
        {
            public int x;
            public int y;
            public int z;
        }

        static Hex move(Hex pos, string direction)
        {
            switch (direction)
            {
                case "n":
                    return new Hex { x = pos.x, y = pos.y + 1, z = pos.z - 1 };
                case "ne":
                    return new Hex { x = pos.x + 1, y = pos.y, z = pos.z - 1 };
                case "se":
                    return new Hex { x = pos.x + 1, y = pos.y - 1, z = pos.z };
                case "s":
                    return new Hex { x = pos.x, y = pos.y - 1, z = pos.z + 1 };
                case "sw":
                    return new Hex { x = pos.x - 1, y = pos.y, z = pos.z + 1 };
                case "nw":
                    return new Hex { x = pos.x - 1, y = pos.y + 1, z = pos.z };
                default:
                    return pos;
            }
        }

        static int distance(Hex start, Hex end)
        {
            return (Math.Abs(start.x - end.x) + Math.Abs(start.y - end.y) + Math.Abs(start.z - end.z)) / 2;
        }
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt").Split(',');
            var startHex = new Hex { x = 0, y = 0, z = 0 };
            var part1 = distance(startHex, input.Aggregate(startHex, move));
            Console.WriteLine(part1);

            var part2 = input.Aggregate((startHex, 0), ((Hex hex, int maxDistance) aggvals, string direction) =>
            {
                var nextHex = move(aggvals.hex, direction);
                var dist = distance(startHex, nextHex);
                return (nextHex, aggvals.maxDistance < dist ? dist : aggvals.maxDistance);
            });

            Console.WriteLine(part2.Item2);
        }
    }
}
