#include <unordered_map>
#include <numeric>
#include <algorithm>
#include <iterator>
#include "utils/input.cpp"

using namespace std;

using Tree = unordered_map<string, vector<string>>;

pair<string, string> split_up(const string &orbit)
{
    const int delim = orbit.find(')');
    return {orbit.substr(0, delim), orbit.substr(delim + 1)};
}

Tree construct_tree(const vector<string> &input)
{
    Tree objects;

    for (string orbit : input)
    {
        auto couple = split_up(orbit);
        objects[couple.second]; // Make sure that leaves exist on the tree
        objects[couple.first].push_back(couple.second);
    }

    return objects;
}

int count_orbits(const Tree &tree, const string &start_node, const int depth = 0)
{
    int val = depth;
    for (auto child : tree.at(start_node))
    {
        val += count_orbits(tree, child, depth + 1);
    }
    return val;
}

vector<string> find_the_way(const Tree &tree, const string &target, string start_at = "COM")
{
    auto children = tree.at(start_at);
    for (auto child : children)
    {
        if (child == target)
        {
            return {child};
        }
        vector<string> acc = find_the_way(tree, target, child);
        if (acc.size() > 0)
        {
            acc.push_back(child);
            return acc;
        }
    }
    return {};
}

int part1(const Tree &tree)
{
    return count_orbits(tree, "COM");
}

int part2(const Tree &tree)
{
    auto path_1 = find_the_way(tree, "YOU");
    auto path_2 = find_the_way(tree, "SAN");

    vector<string>::iterator it2;
    for (auto it(path_1.begin()); it != path_1.end(); ++it)
    {
        if ((it2 = find(path_2.begin(), path_2.end(), *it)) != path_2.end())
        {
            int d1 = distance(path_2.begin(), it2) - 1;
            int d2 = distance(path_1.begin(), it) - 1;
            return d1 + d2;
        }
    }
    return 0;
}

int main()
{
    const vector<string> input = read_input_vs("input/6/6.txt");
    const Tree tree = construct_tree(input);

    cout << "Part 1: " << part1(tree) << endl;
    cout << "Part 2: " << part2(tree) << endl;
}