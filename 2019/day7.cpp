#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include <algorithm>
#include "intcode.hpp"
#include "utils/input.hpp"

using namespace std;

int amplify(const vector<long> &input, const vector<int> &phase_settings)
{
    int ret = 0;
    
    for (int i = 0; i <= 4; i++)
    {
        deque<long> args = {phase_settings[i], ret};
        ret = computer(input, args);
    }
    return ret;
}

int feedback_amplify(const vector<long> &input, const vector<int> &phase_settings)
{
    int val = 0;
    int max = 0;

    deque<long> signals;
    vector<int> computers;

    for (int i = 0; i <= 4; i = (i + 1) % 4)
    {
        signals.push_back(phase_settings[i]);
        computer(input, signals);
        if (val < max)
        {
            break;
        }
        max = val;
    }
    return max;
}

int part1(const vector<long> &input)
{
    int max = 0;
    int val = 0;
    vector<int> phase_vals = {0, 1, 2, 3, 4};
    do
    {
        if ((val = amplify(input, phase_vals)) > max)
        {
            max = val;
        };
    } while (next_permutation(phase_vals.begin(), phase_vals.end()));

    return max;
}

// int part2(const vector<int> &input)
// {
//     int max = 0;
//     int val = 0;
//     vector<int> phase_vals = {9, 8, 7, 6, 5};
//     return feedback_amplify(input, phase_vals);
// }

int main()
{
    const vector<long> input = read_input_vl("./input/7/7.txt");

    const vector<long> example = {3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
                                 27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5};

    cout << "Part 1: " << part1(input) << endl;
    //cout << "Part 2: " << part2(example) << endl;
}