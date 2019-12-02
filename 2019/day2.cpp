#include <vector>
#include <string>
#include <iostream>
#include <fstream>

#include "utils/input.cpp"

using namespace std;

int computer(vector<int> input, int noun, int verb)
{
    input[1] = noun;
    input[2] = verb;
    for (int i = 0; i < input.size(); i += 4)
    {
        switch(input[i]) {
            case 1:
                input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]];
                break;
            case 2:
                input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]];
                break;
            default: // 99
                return input[0];
        }
    }

    return 0;
}

int part1(const vector<int> &input)
{
    return computer(input, 12, 2);
}

int part2(const vector<int> &input) {
    constexpr int target = 19690720;

    for (int noun = 0; noun < 100; noun++){
        for (int verb = 0; verb < 100; verb++) {
            if (computer(input, noun, verb) == target) {
                return 100 * noun + verb;
            }
        }
    }

    return 0;
}

int main()
{
    const vector<int> input = read_input_vi("./input/2/2.txt");

    cout << "Part 1: " << part1(input) << endl;
    cout << "Part 2: " << part2(input) << endl;
}