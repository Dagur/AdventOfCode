#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

#include "intcode.hpp"
#include "utils/input.hpp"

enum Direction
{
    N,
    E,
    S,
    W
};

const std::vector<Direction> directions = {N, E, S, W};

struct Robot
{
    Direction dir = N;

    void turn_right()
    {
        const int pos = (std::find(directions.begin(), directions.end(), dir) - directions.begin() + 1) % 4;
        dir = directions[pos];
    }
    void turn_left()
    {
        const int pos = (std::find(directions.begin(), directions.end(), dir) - directions.begin() - 1);
        dir = directions[pos == -1 ? 3 : pos];
    }
};

int main()
{
    std::vector<long> input = read_input_vl("./input/11/11.txt");
    State state;
    state.program = input;
    int user_input;
    while (!state.halted)
    {
        state = computer(state);
        if (state.waiting_for_input)
        {
            std::cout << "Enter number: ";
            std::cin >> user_input;
            state.provide_input(user_input);
        }
    }

    std::cout << "Part1 :" << state.diagnostic_code << std::endl;

    return 0;
}