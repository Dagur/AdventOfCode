using System;
using System.Collections.Generic;
using System.Linq;

namespace day1
{
    class Program
    {
        enum Direction { North, East, South, West }
        struct Position
        {
            public Direction facing;
            public int x;
            public int y;
        }

        static int measureDistance(Position startPos, Position endPos)
        {
            return Math.Abs(endPos.x - startPos.x) + Math.Abs(endPos.y - startPos.y);
        }

        static int moveX(Direction dir, int distance)
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

        static int moveY(Direction dir, int distance)
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

        static Position move(Position pos, (char, int) instruction)
        {
            var (side, distance) = instruction;
            var facing = (uint)pos.facing;
            var direction = (Direction)((side == 'R' ? facing + 1 : facing - 1) % 4);

            return new Position
            {
                facing = direction,
                x = pos.x + moveX(direction, distance),
                y = pos.y + moveY(direction, distance)
            };
        }

        static Direction GetDirection(Direction facing, char turn)
        {
            return (Direction)((turn == 'R' ? (uint)facing + 1 : (uint)facing - 1) % 4);
        }

        static void Main(string[] args)
        {
            const string instructions = "R2, L3, R2, R4, L2, L1, R2, R4, R1, L4, L5, R5, R5" +
            ", R2, R2, R1, L2, L3, L2, L1, R3, L5, R187, R1, R4, L1, R5, L3, L4, R50, L4, R2" +
            ", R70, L3, L2, R4, R3, R194, L3, L4, L4, L3, L4, R4, R5, L1, L5, L4, R1, L2, R4" +
            ", L5, L3, R4, L5, L5, R5, R3, R5, L2, L4, R4, L1, R3, R1, L1, L2, R2, R2, L3, R3" +
            ", R2, R5, R2, R5, L3, R2, L5, R1, R2, R2, L4, L5, L1, L4, R4, R3, R1, R2, L1, L2" +
            ", R4, R5, L2, R3, L4, L5, L5, L4, R4, L2, R1, R1, L2, L3, L2, R2, L4, R3, R2, L1" +
            ", L3, L2, L4, L4, R2, L3, L3, R2, L4, L3, R4, R3, L2, L1, L4, R4, R2, L4, L4, L5" +
            ", L1, R2, L5, L2, L3, R2, L2";
            
            var moves = instructions.Split(", ").Select(x => (x[0], int.Parse(x.Substring(1)))).ToArray();
            var startPos = new Position
            {
                facing = Direction.North,
                x = 0,
                y = 0
            };

            var endPos = moves.Aggregate(startPos, move);
            Console.WriteLine(measureDistance(startPos, endPos));

            /* Part 2 */
            var expandedMoves = moves.Aggregate(new List<Direction>(), (moveList, instruction) =>
            {
                var (turn, distance) = instruction;
                var direction = GetDirection(moveList.LastOrDefault(), turn);
                while (distance-- > 0)
                {
                    moveList.Add(direction);
                }
                return moveList;
            });

            var history = new List<(int, int)> { (0, 0) };
            (int x, int y) pos = (0, 0);
            (int x, int y) nextpos = (0, 0);
            foreach (var move in expandedMoves)
            {
                switch (move)
                {
                    case Direction.North:
                        nextpos = (pos.x, pos.y + 1);
                        break;
                    case Direction.East:
                        nextpos = (pos.x + 1, pos.y);
                        break;
                    case Direction.South:
                        nextpos = (pos.x, pos.y - 1);
                        break;
                    case Direction.West:
                        nextpos = (pos.x - 1, pos.y);
                        break;
                }
                if (history.Any(((int x, int y) p) => p.x == nextpos.x && p.y == nextpos.y))
                {
                    endPos = new Position { facing = move, x = nextpos.x, y = nextpos.y };
                    Console.Write(measureDistance(startPos, endPos));
                    break;
                }
                history.Add(nextpos);
                pos = nextpos;

            }
        }
    }
}
