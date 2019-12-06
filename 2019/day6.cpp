#include <unordered_map>
#include <numeric>
#include <algorithm>
#include "utils/input.cpp"

using namespace std;

pair<string, string> split(const string orbit)
{
    const int delim = orbit.find(')');
    return {orbit.substr(0, delim), orbit.substr(delim + 1)};
}

void insert_or_update(unordered_map<string, int> &map, const string key, const int increment)
{
    // auto it = map.find(key);
    // if (it != map.end())
    // {
        map[key] += increment;
    // }
    // else
    // {
    //     map.emplace(key, increment);
    // }
}

int sum(const unordered_map<string, int> &map)
{
    return accumulate(
        map.begin(),
        map.end(),
        0,
        [](int value, const unordered_map<string, int>::value_type &p) { return value + p.second; });
}

int part1(vector<string> input)
{
    unordered_map<string, int> objects;
    sort(input.begin(), input.end());

    for (string orbit : input)
    {
        auto couple = split(orbit);
        insert_or_update(objects, couple.second, 1 + objects[couple.first]);
    }

    return sum(objects);
}

int main()
{
    const vector<string> input = read_input_vs("input/6/6.txt");

    cout << "Part 1: " << part1({
                              "S)B",
                            "B)G",
                              "G)H",
                              "D)I",
                              "E)J",
                              "J)K",
                              "K)L",
                              "B)C",
                              "C)D",
                              "D)E",
                              "E)F",

                          })
         << endl;
}