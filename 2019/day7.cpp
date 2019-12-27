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
    for (int i = 0; i <= 4; ++i)
    {
        State state;
        state.program = input;
        state = computer(state);
        state.provide_input(phase_settings[i]);
        state = computer(state);
        state.provide_input(ret);
        state = computer(state);
        ret = state.diagnostic_codes.back();
    }
    return ret;
}

int feedback_amplify(const vector<long> &input, const vector<int> &phase_settings)
{
    vector<State> states;
    int io = 0;
    for (auto val : phase_settings)
    {
        State s;
        s.program = input;
        s = computer(s);
        s.provide_input(val);
        s = computer(s);
        states.push_back(s);
        io = s.diagnostic_codes.front();
    }

    for (int i = 0; i < states.size(); i = (i + 1) % states.size())
    {
        if (states[i].halted)
        {
            break;
        }
        else if (states[i].waiting_for_input)
        {
            states[i].provide_input(io);
            states[i] = computer(states[i]);
            io = states[i].diagnostic_codes.back();
        }
        else
        {
            std::cout << "Invalid state" << std::endl;
            break;
        }
    }
    return io;
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

int part2(const vector<long> &input)
{
    int max = 0;
    int val = 0;
    vector<int> phase_vals = {5, 6, 7, 8, 9};
    do
    {
        if ((val = feedback_amplify(input, phase_vals)) > max)
        {
            max = val;
        };
    } while (next_permutation(phase_vals.begin(), phase_vals.end()));

    return max;
}

int main()
{
    const vector<long> input = read_input_vl("./input/7/7.txt");

    cout << "Part 1: " << part1(input) << endl;
    cout << "Part 2: " << part2(input) << endl;
}