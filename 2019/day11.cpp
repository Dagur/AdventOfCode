#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
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
    std::pair<int, int> pos = {0, 0};
    std::vector<std::tuple<int, int, bool>> path;

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
    void paint_and_move(const bool white)
    {
        path.push_back({ pos.first, pos.second, white });
        switch(dir)
        {
            case N:
                pos = { pos.first, pos.second + 1 };
                break;
            case S:
                pos = { pos.first, pos.second - 1 };
                break;
            case E:
                pos = { pos.first + 1, pos.second };
                break;
            case W:
                pos = { pos.first - 1, pos.second };
                break;
        }
    }
};

int main()
{
    std::vector<long> input = read_input_vl("./input/11/11.txt");
    State state;
    state.program = input;
    int user_input = 0;
    long color, turn;
    Robot rob;
    while (!state.halted)
    {
        state = computer(state);
        if (state.waiting_for_input)
        {
            // std::cout << "Enter number: ";
            // std::cin >> user_input;
            state.provide_input(user_input);
        }

        color = state.read_output();
        turn = state.read_output();
        std::cout << "Color to paint: " << color << std::endl;
        std::cout << "Direction to turn: " << turn << std::endl;

        if (turn == 0) { rob.turn_left(); } else { rob.turn_right(); }
        rob.paint_and_move(color == 1);
    }

    // std::cout << "Part1 :" << state.diagnostic_code << std::endl;

    return 0;
}