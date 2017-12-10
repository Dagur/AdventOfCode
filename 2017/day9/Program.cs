using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;

namespace day9
{
    enum TokenTypes { Group, Garbage, Text }
    struct Group
    {
        public int Level;
        public List<Group> SubGroups;
        public int GarbageCount;
    }

    class Program
    {
        static int SkipGarbage(Stack<char> garbage)
        {
            char ch;
            int garbageCount = 0;
            while (true)
            {
                ch = garbage.Peek();
                if (ch == '!')
                {
                    garbage.Pop();
                    garbage.Pop();
                }
                else if (ch == '>')
                {
                    garbage.Pop();
                    return garbageCount - 1;
                }
                else
                {
                    garbage.Pop();
                    garbageCount++;
                }
            }
        }

        static Group ParseGroup(Stack<char> symbols, int level = 1)
        {
            var ret = new Group
            {
                SubGroups = new List<Group>(),
                Level = level,
                GarbageCount = 0
            };
            char ch = symbols.Pop();
            while (true)
            {
                ch = symbols.Peek();
                if (ch == '!')
                {
                    symbols.Pop();
                    symbols.Pop();
                }
                else if (ch == '{')
                {
                    ret.SubGroups.Add(ParseGroup(symbols, level + 1));
                }
                else if (ch == '<')
                {
                    ret.GarbageCount += SkipGarbage(symbols);
                }
                else if (ch == '}')
                {
                    symbols.Pop();
                    return ret;
                }
                else
                {
                    symbols.Pop();
                }
            }
        }

        static List<Group> Tokenize(Stack<char> symbols)
        {
            var tokens = new List<Group>();
            char ch;

            while (symbols.Count() > 0)
            {
                ch = symbols.Peek();
                if (ch == '!')
                {
                    symbols.Pop();
                    symbols.Pop();
                }
                else if (ch == '<')
                {
                    SkipGarbage(symbols);
                }
                else if (ch == '{')
                {
                    tokens.Add(ParseGroup(symbols));
                }
                else
                {
                    symbols.Pop();
                }
            }
            return tokens;
        }

        static int CalculateGroupScore(List<Group> groups)
        {
            return groups.Sum(group =>
                group.SubGroups.Count() == 0 ? group.Level : group.Level + CalculateGroupScore(group.SubGroups));
        }

        static int CountGarbage(List<Group> groups)
        {
            return groups.Sum(group =>
                group.SubGroups.Count == 0 ? group.GarbageCount : group.GarbageCount + CountGarbage(group.SubGroups));
        }
        static void Main(string[] args)
        {
            var input = File.ReadAllText("input.txt").ToCharArray();
            var tokens = Tokenize(new Stack<char>(input.Reverse()));
            Console.WriteLine(CalculateGroupScore(tokens));
            Console.WriteLine(CountGarbage(tokens));
        }
    }
}
