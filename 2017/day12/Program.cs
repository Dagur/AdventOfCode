using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Text.RegularExpressions;

namespace day12
{
    class Program
    {
        static Dictionary<int, List<int>> ParseInput(string filename)
        {
            Regex re = new Regex(@"^(\d+) <-> ([0-9, ]+)$");
            return File.ReadLines(filename)
                .Select(line => re.Match(line))
                .ToDictionary(
                    match => Int32.Parse(match.Groups[1].Value),
                    match => match.Groups[2].Value.Split(", ").Select(Int32.Parse).ToList()
                );
        }

        static HashSet<int> GetGroup(Dictionary<int, List<int>> endPoints, int id)
        {
            var group = new HashSet<int> { id };

            while (true)
            {
                var pointsfound = group.SelectMany(point => endPoints[point])
                    .Aggregate(new HashSet<int>(), (set, val) =>
                    {
                        set.Add(val);
                        return set;
                    });
                if (group.SetEquals(pointsfound))
                    break;

                group.UnionWith(pointsfound);
            }
            return group;
        }
        static void Main(string[] args)
        {
            var endPoints = ParseInput("input.txt");
            var part1 = GetGroup(endPoints, 0).Count();
            Console.WriteLine(part1);

            var part2 = endPoints.Keys.Aggregate(new List<HashSet<int>>(), (groups, key) =>
            {
                if (!groups.Any(group => group.Contains(key))){
                    groups.Add(GetGroup(endPoints, key));
                }
                return groups;
            }).Count();

            Console.WriteLine(part2);
        }
    }
}
