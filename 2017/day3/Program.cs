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

        static void Main(string[] args)
        {
            var input = 347991;
            var part1 = CreateSquares(input).Where(square => square.val == input).First();
            Console.WriteLine(part1.distance);

        }
    }
}
