using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace day7
{
    class Program
    {
        struct BasicNode
        {
            public string Name;
            public int Weight;
            public List<string> SubNodes;
        }

        struct ProperNode
        {
            public string Name;
            public int Weight;
            public int TotalWeight;
            public List<ProperNode> SubNodes;
        }

        static BasicNode ParseLine(string line)
        {
            const string reg = @"^(\w+) \((\d+)\)(?: -> (.+))?$";
            Match m = Regex.Match(line, reg);
            var groups = m.Groups.Select(g => g.Value).ToArray();
            return new BasicNode
            {
                Name = groups[1],
                Weight = int.Parse(groups[2]),
                SubNodes = groups[3] != "" ? groups[3].Split(", ").ToList() : new List<string>()
            };
        }

        static ProperNode CreateNodeTree(BasicNode[] nodeList, BasicNode root)
        {
            var nodeDict = nodeList.ToDictionary(node => node.Name, node => node);

            ProperNode createTree(BasicNode node)
            {
                var subNodes = node.SubNodes.Select(nodeName => createTree(nodeDict.GetValueOrDefault(nodeName)));
                return new ProperNode
                {
                    Name = node.Name,
                    Weight = node.Weight,
                    TotalWeight = node.Weight + subNodes.Sum(n => n.TotalWeight),
                    SubNodes = subNodes.ToList()
                };
            }
            return createTree(root);
        }

        static void Main(string[] args)
        {
            var input = File.ReadLines("input.txt");
            var nodes = input.Select(ParseLine).ToArray();
            var subNodes = nodes.SelectMany(n => n.SubNodes);
            var part1 = nodes.Where(node => !subNodes.Contains(node.Name)).First();
            Console.WriteLine(part1.Name);
            var tree = CreateNodeTree(nodes, part1);
            // Use the debugger to find the answer to part 2
        }
    }
}
