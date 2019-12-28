#include <iostream>
#include <vector>
#include <string>
#include <regex>
#include <map>

#include "utils/input.hpp"
#include "intcode.hpp"

using Point = std::pair<int, int>;

const std::map<Point, int> make_grid(const State &state)
{
    std::map<Point, int> grid;
    for (int i = 0; i < state.diagnostic_codes.size(); i += 3)
    {
        grid[{state.diagnostic_codes[i], state.diagnostic_codes[i + 1]}] = state.diagnostic_codes[i + 2];
    }
    return grid;
}

const int count_blocks(const std::map<Point, int> &grid)
{
    return std::count_if(grid.begin(), grid.end(), [](auto p) { return p.second == 2; });
}

int part1(const std::vector<long> &input)
{
    State state;
    state.program = input;
    state.program.resize(state.program.size() * 4);
    state = computer(state);
    std::map<Point, int> grid = make_grid(state);

    return count_blocks(grid);
}

int part2(const std::vector<long> &input)
{
    State state;
    state.program = input;
    state.program.resize(state.program.size() * 4);
    state.program.at(0) = 2;
    state = computer(state);
    std::map<Point, int> grid = make_grid(state);

    while (!state.halted && count_blocks(grid) > 0)
    {
        auto ball = *std::find_if(grid.begin(), grid.end(), [](auto p) { return p.second == 4; });
        auto paddle = *std::find_if(grid.begin(), grid.end(), [](auto p) { return p.second == 3; });

        if (ball.first.first < paddle.first.first)
        {
            state.provide_input(-1);
        }
        else if (ball.first.first > paddle.first.first)
        {
            state.provide_input(1);
        }
        else
        {
            state.provide_input(0);
        }
        state = computer(state);
        grid = make_grid(state);
    }

    int score = (*std::find_if(grid.begin(), grid.end(), [](auto p) { return p.first.first == -1 && p.first.second == 0; })).second;

    return score;
}

int main()
{
    std::vector<long> input = read_input_vl("./input/13/13.txt");

    std::cout << "Part 1: " << part1(input) << std::endl;
    std::cout << "Part 2: " << part2(input) << std::endl;
}