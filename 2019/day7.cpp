#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include <algorithm>
#include "intcode.hpp"
#include "utils/input.hpp"

using namespace std;

int amplify(const vector<int> &input, const vector<int> &phase_settings)
{
    int ret = 0;
    for (int i = 0; i <= 4; i++)
    {
        ret = computer(input, {phase_settings[i], ret});
    }
    return ret;
}

int part1(const vector<int> &input)
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

int main()
{
    const vector<int> input = read_input_vi("./input/7/7.txt");

    cout << "Part 1: " << part1(input) << endl;
}