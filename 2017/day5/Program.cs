using System;
using System.IO;
using System.Linq;

namespace day5
{
    class Program
    {
        static int Jump(int[] offsets)
        {
            int jumpCount = 0;
            int position = 0;
            int nextpos = 0;
            while (nextpos < offsets.Length) {
                nextpos = position + offsets[position]++;
                position = nextpos;
                jumpCount++;
            }
            return  jumpCount;
        }

        static int Jump2(int[] offsets)
        {
            int jumpCount = 0;
            int position = 0;
            int nextpos = 0;
            while (nextpos < offsets.Length) {
                if (offsets[position] < 3) {
                    nextpos = position + offsets[position]++;
                } else {
                    nextpos = position + offsets[position]--;
                }                
                position = nextpos;
                jumpCount++;
            }
            return  jumpCount;
        }

        static void Main(string[] args)
        {
            var input = File.ReadLines("input.txt").Select(Int32.Parse);
            Console.WriteLine(Jump(input.ToArray()));
            Console.WriteLine(Jump2(input.ToArray()));
        }
    }
}