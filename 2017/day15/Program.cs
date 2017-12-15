using System;
using System.Collections.Generic;
using System.Linq;

namespace day15
{
    class Program
    {
        static IEnumerable<ulong> Generator(ulong startVal, ulong factor, ulong divider)
        {
            var last = startVal;
            while (true)
            {
                last = (last * factor) % divider;
                yield return last;
            }
        }

        static IEnumerable<ulong> MultiplesOf(IEnumerable<ulong> seq, int val)
        {
            return seq.Where(x => (long)x % val == 0);
        }

        static bool BinCompare(ulong A, ulong B)
        {
            var testa = Convert.ToString((long)A, 2);
            var testb = Convert.ToString((long)B, 2);
            return testa.Substring(Math.Max(0, testa.Length - 16)).Equals(testb.Substring(Math.Max(0, testb.Length - 16)));
        }

        static int CountMatches(int pairsToConsider, IEnumerator<ulong> genA, IEnumerator<ulong> genB)
        {
            return Enumerable.Range(0, pairsToConsider)
                .Select(_ =>
                {
                    genA.MoveNext();
                    genB.MoveNext();
                    return (genA.Current, genB.Current);
                })
                .AsParallel()
                .Where(p => BinCompare(p.Item1, p.Item2))
                .Count();
        }

        static void Main(string[] args)
        {
            ulong A = 277;
            ulong B = 349;
            ulong factorA = 16807;
            ulong factorB = 48271;
            ulong divider = 2147483647;

            var genA = Generator(A, factorA, divider).GetEnumerator();
            var genB = Generator(B, factorB, divider).GetEnumerator();

            var part1 = CountMatches(40000000, genA, genB);
            Console.WriteLine(part1);

            // part 2

            var genAm = MultiplesOf(Generator(A, factorA, divider), 4).GetEnumerator();
            var genBm = MultiplesOf(Generator(B, factorB, divider), 8).GetEnumerator();

            var part2 = CountMatches(5000000, genAm, genBm);            
            Console.WriteLine(part2);
        }
    }
}
