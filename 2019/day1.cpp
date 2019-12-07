#include <iostream>
#include <vector>
#include <string>

#include "utils/input.hpp"

using namespace std;

int fuel_required(const int mass)
{
    return (mass / 3) - 2;
}

int total_fuel_required(const int mass)
{
    int total = 0;
    int required = fuel_required(mass);

    while (required > 0)
    {
        total += required;
        required = fuel_required(required);
    }

    return total;
}

int part1(const vector<string> &masses)
{
    int sum = 0;

    for (const string &mass : masses)
    {
        sum += fuel_required(stoi(mass));
    }

    return sum;
}

int part2(const vector<string> &masses)
{
    int sum = 0;

    for (const string &mass : masses)
    {
        sum += total_fuel_required(stoi(mass));
    }

    return sum;
}

int main()
{
    const vector<string> masses{read_input_vs("./input/1/1.txt")};
    cout << "Part 1: " << part1(masses) << endl;
    cout << "Part 2: " << part2(masses) << endl;
}