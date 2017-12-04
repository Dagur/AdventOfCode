using System;
using System.IO;
using System.Linq;

namespace day4
{
    class Program
    {

        static string[][] readFile(string filename) =>
            File.ReadLines(filename).Select((line) => line.Split(" ")).ToArray();

        static void Main(string[] args)
        {
            var input = readFile("input.txt");

            var part1 = input.Where(line => line.Distinct().Count() == line.Count()).Count();
            Console.WriteLine(part1);

            var part2 = input.Select(line => line.Select(s => string.Join("", s.ToCharArray().OrderBy(c => c))))
                             .Where(line => line.Distinct().Count() == line.Count()).Count();
            Console.WriteLine(part2);            
        }
    }
}
