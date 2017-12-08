using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace day8
{
    class Program
    {
        struct Instruction
        {
            public string Register;
            public string Action;

            public int ActionValue;
            public Func<int, bool> Test;
            public string TestRegister;
        }

        static Func<int, bool> CreateTest(string op, int value)
        {
            switch (op)
            {
                case "==":
                    return (x) => x == value;
                case "!=":
                    return (x) => x != value;
                case "<":
                    return (x) => x < value;
                case "<=":
                    return (x) => x <= value;
                case ">":
                    return (x) => x > value;
                case ">=":
                    return (x) => x >= value;
                default:
                    return (x) => false;
            }
        }
        static Instruction CreateInstruction(string line)
        {
            var values = line.Split(' ').ToArray();
            return new Instruction
            {
                Register = values[0],
                Action = values[1],
                ActionValue = Int32.Parse(values[2]),
                TestRegister = values[4],
                Test = CreateTest(values[5], Int32.Parse(values[6]))
            };
        }

        static void Main(string[] args)
        {

            var instructions = File.ReadLines("input.txt").Select(CreateInstruction);
            var vals = new Dictionary<string, int>();
            var highestEver = -1000;
            foreach (var instr in instructions)
            {
                if (instr.Test(vals.GetValueOrDefault(instr.TestRegister)))
                {
                    if (instr.Action == "inc")
                    {
                        vals[instr.Register] = vals.GetValueOrDefault(instr.Register) + instr.ActionValue;
                    }
                    else
                    {
                        vals[instr.Register] = vals.GetValueOrDefault(instr.Register) - instr.ActionValue;
                    }
                    if (vals[instr.Register] > highestEver)
                    {
                        highestEver = vals[instr.Register];
                    }
                }
            }

            Console.WriteLine(vals.Values.Max());
            Console.WriteLine(highestEver);
        }
    }
}
