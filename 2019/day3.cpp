#include <iostream>
#include <fstream>
#include <sstream>
#include <algorithm>
#include <vector>
#include "./utils/input.hpp"

using namespace std;

using Wire = vector<pair<int, int>>;

void extend(Wire &wire, pair<int, int> &pos, const string &instruction)
{
    const int dist = stoi(instruction.substr(1));
    pair<int, int> modifier;
    switch (instruction[0])
    {
    case 'R':
        modifier = {1, 0};
        break;
    case 'L':
        modifier = {-1, 0};
        break;
    case 'U':
        modifier = {0, 1};
        break;
    case 'D':
        modifier = {0, -1};
        break;
    default:
        cout << "Error in instruction " << instruction << endl;
        break;
    }

    for (int i = dist; i != 0; i--)
    {
        pos = {pos.first + modifier.first, pos.second + modifier.second};
        wire.push_back(pos);
    }
}

Wire get_wire(const string &instructions)
{
    // Vector of every point that the wire is present
    Wire wire;
    pair<int, int> pos = {0, 0};

    istringstream oss(instructions);
    string instruction;

    while (getline(oss, instruction, ','))
    {
        extend(wire, pos, instruction);
    }

    return wire;
}

int distance(pair<int, int> point)
{
    return abs(point.first) + abs(point.second);
}

int part1(const Wire &wire1, const Wire &wire2)
{
    int minDist = -1;

    for (auto point : wire2)
    {
        if (std::find(wire1.begin(), wire1.end(), point) != wire1.end())
        {
            int dist = distance(point);
            if (minDist == -1 || dist < minDist)
            {
                minDist = dist;
            }
        }
    }

    return minDist;
}

int part2(const Wire &wire1, const Wire &wire2)
{
    int steps = -1;

    for (int i = 0; i != wire1.size(); i++)
    {
        for (int j = 0; j != wire2.size(); j++)
        {
            if (wire1[i] == wire2[j] && (steps == -1 || i + j < steps))
            {
                steps = i + j;
            }
        }
    }

    return steps + 2; // Add 2 because i and j are indexes
}

// Unoptimized but works
int main()
{
    const vector<string> input = read_input_vs("input/3/3.txt");

    if (input.size() != 2)
    {
        perror("Invalid file");
        exit(EXIT_FAILURE);
    }

    const Wire wire1 = get_wire(input[0]);
    const Wire wire2 = get_wire(input[1]);

    cout << "Part 1: " << part1(wire1, wire2) << endl;
    cout << "Part 2: " << part2(wire1, wire2) << endl;
}