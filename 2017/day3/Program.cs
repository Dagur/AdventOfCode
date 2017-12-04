using System;
using System.Linq;
using System.Collections.Generic;

namespace day3
{
    class Program
    {
        struct Square
        {
            public int val;
            public int distance;
        }

        /*Damn whomever decided to use count as the second argument */
        static IEnumerable<int> Range(int start, int end)
        {
            return Enumerable.Range(start, end - start);
        }

        static IEnumerable<Square> CreateSquares(int maxval)
        {
            int val = 1;
            int circle = 1;

            yield return new Square { val = val++, distance = 0 };
            while (val < maxval)
            {
                var sequence = Enumerable.Repeat(
                        Range(circle, circle * 2).Reverse().Concat(Range(circle + 1, circle * 2 + 1))
                    , 4).SelectMany(i => i);

                foreach (var distance in sequence)
                {
                    yield return new Square { val = val++, distance = distance };
                }
                circle++;
            }
        }

        //part 2
        public static int[][] GenerateEmptyMatrix(int size)
        {
            return Range(0, size).Select(_ =>
                Range(0, size).Select(__ => (int)0).ToArray()
            ).ToArray();
        }

        public static IEnumerable<(int x, int y)> Moves()
        {
            var (x, y) = (0, 0);
            var layer = 0;
            //yield return (x, y); Skip the center
            while (true)
            {
                layer += 1;
                yield return (++x, y);
                while (y < layer)
                {
                    yield return (x, ++y);
                }
                while (x > -layer)
                {
                    yield return (--x, y);
                }
                while (y > -layer)
                {
                    yield return (x, --y);
                }
                while (x < layer)
                {
                    yield return (++x, y);
                }
            }
        }

        static int GetSquareSum(int[][] matrix, (int x, int y) point)
        {
            return Range(point.x-1,point.x+2)
                .Select(x => Range(point.y-1, point.y+2).Select(y => matrix[x][y]))
                .SelectMany(i=>i)
                .Sum();
        }

        static void Main(string[] args)
        {
            var input = 347991;
            var part1 = CreateSquares(input).Where(square => square.val == input).First();
            Console.WriteLine(part1.distance);

            //Part 2
            var matrix = GenerateEmptyMatrix(99);
            (int x, int y) center = (44, 44);
            matrix[center.x][center.y] = 1;

            foreach ((int x, int y) point in Moves().Select(m => (m.x + center.x, m.y + center.y)))
            {
                var val = GetSquareSum(matrix, point);
                matrix[point.x][point.y] = val;

                if (val > input) {
                    Console.WriteLine($"({point.x},{point.y}): {val}");
                    break;
                }
            }
        }
    }
}
