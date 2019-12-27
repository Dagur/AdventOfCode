#include <iostream>
#include <vector>
#include <string>
#include <regex>
#include <map>

#include "utils/input.hpp"
#include "intcode.hpp"

using Point = std::pair<int, int>;

int main()
{
    std::vector<long> input = read_input_vl("./input/13/13.txt");
    State state;
    state.program = input;
    state = computer(state);
    // std::map<Point, int> grid;

    // for (int i = 0; i < state.diagnostic_codes.size(); i += 3)
    // {
    //     grid[{state.diagnostic_codes[i], state.diagnostic_codes[i + 1]}] = state.diagnostic_codes[i + 2];
    // }

    // int count = 0;
    // for (auto point : grid)
    // {
    //     if (point.second == 2)
    //     {
    //         ++count;
    //     }
    // }

    // std::cout << "Part 1: " << count << std::endl;
}