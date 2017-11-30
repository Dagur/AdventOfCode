using System;
using System.Linq;

namespace day1
{
    class Program
    {
        enum Direction { North, East, South, West }
        struct Position
        {
            public Direction facing;
            public double x;
            public double y;
        }
        static double measureDistance(Position startPos, Position endPos)
        {
            return Math.Abs(endPos.x - startPos.x) + Math.Abs(endPos.y - startPos.y);
        }

        static double moveX(Direction dir, double distance)
        {
            switch (dir)
            {
                case Direction.East:
                    return distance;
                case Direction.West:
                    return -1 * distance;
                default:
                    return 0;
            }
        }

        static double moveY(Direction dir, double distance)
        {
            switch (dir)
            {
                case Direction.North:
                    return distance;
                case Direction.South:
                    return -1 * distance;
                default:
                    return 0;
            }
        }

        static Position move(Position pos, string instruction)
        {
            (char side, double distance) = (instruction[0], int.Parse(instruction.Substring(1)));
            var facing = (uint)pos.facing;
            var direction = (Direction)((side == 'R' ? facing + 1 : facing - 1) % 4);

            return new Position
            {
                facing = direction,
                x = pos.x + moveX(direction, distance),
                y = pos.y + moveY(direction, distance)
            };
        }
        static void Main(string[] args)
        {
            const string instructions = "R2, L3, R2, R4, L2, L1, R2, R4, R1, L4, L5, R5, R5, R2, R2, R1, L2, L3, L2, L1, R3, L5, R187, R1, R4, L1, R5, L3, L4, R50, L4, R2, R70, L3, L2, R4, R3, R194, L3, L4, L4, L3, L4, R4, R5, L1, L5, L4, R1, L2, R4, L5, L3, R4, L5, L5, R5, R3, R5, L2, L4, R4, L1, R3, R1, L1, L2, R2, R2, L3, R3, R2, R5, R2, R5, L3, R2, L5, R1, R2, R2, L4, L5, L1, L4, R4, R3, R1, R2, L1, L2, R4, R5, L2, R3, L4, L5, L5, L4, R4, L2, R1, R1, L2, L3, L2, R2, L4, R3, R2, L1, L3, L2, L4, L4, R2, L3, L3, R2, L4, L3, R4, R3, L2, L1, L4, R4, R2, L4, L4, L5, L1, R2, L5, L2, L3, R2, L2";
            var startPos = new Position
            {
                facing = Direction.North,
                x = 0,
                y = 0
            };

            var endPos = instructions.Split(", ").Aggregate(startPos, move);
            Console.WriteLine(measureDistance(startPos, endPos));
        }
    }
}
