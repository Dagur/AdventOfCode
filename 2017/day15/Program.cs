using System;
using System.Collections.Generic;
using System.Linq;

namespace day15
{
    class Program
    {
        static IEnumerable<long> Generator(long startVal, long factor, long divider)
        {
            var last = startVal;
            while (true)
            {
                last = (last * factor) % divider;
                yield return last;
            }
        }

        static IEnumerable<long> MultiplesOf(IEnumerable<long> seq, int val)
        {
            return seq.Where(x => (long)x % val == 0);
        }

        static bool BinCompare(long A, long B)
        {
            return (A & 0xFFFF) == (B & 0xFFFF);
        }

        static int CountMatches(int pairsToConsider, IEnumerable<long> genA, IEnumerable<long> genB)
        {
            return genA.Zip(genB, (a, b) => (a, b))
                .Take(pairsToConsider)
                .AsParallel()
                .Where(p => BinCompare(p.Item1, p.Item2))                
                .Count();
        }

        static void Main(string[] args)
        {
            long A = 277;
            long B = 349;
            long factorA = 16807;
            long factorB = 48271;
            long divider = 2147483647;

            var genA = Generator(A, factorA, divider);
            var genB = Generator(B, factorB, divider);

            var part1 = CountMatches(40000000, genA, genB);
            Console.WriteLine(part1);

            // part 2

            var genAm = MultiplesOf(Generator(A, factorA, divider), 4);
            var genBm = MultiplesOf(Generator(B, factorB, divider), 8);

            var part2 = CountMatches(5000000, genAm, genBm);
            Console.WriteLine(part2);
        }
    }
}
