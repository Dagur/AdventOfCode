#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
#include <set>
#include <string>
#include <algorithm>

#include "intcode.hpp"
#include "utils/input.hpp"

using Point = std::pair<int, int>;

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
    std::vector<std::vector<int>> grid;
    Direction dir = N;
    Point pos = {64, 64};
    std::vector<Point> path;

    void turn_right()
    {
        const int idx = (std::find(directions.begin(), directions.end(), dir) - directions.begin() + 1) % 4;
        dir = directions[idx];
    }
    void turn_left()
    {
        const int idx = (std::find(directions.begin(), directions.end(), dir) - directions.begin() - 1);
        dir = directions[idx == -1 ? 3 : idx];
    }
    void paint(const int color)
    {
        grid.at(pos.first).at(pos.second) = color;
        path.push_back(pos);
    }

    void move()
    {
        switch (dir)
        {
        case N:
            pos = {pos.first, pos.second + 1};
            break;
        case S:
            pos = {pos.first, pos.second - 1};
            break;
        case E:
            pos = {pos.first + 1, pos.second};
            break;
        case W:
            pos = {pos.first - 1, pos.second};
            break;
        }
    }
    int get_pos_color()
    {
        return grid.at(pos.first).at(pos.second);
    }
    void print_grid()
    {
        for (auto row : grid)
        {
            for (auto col : row)
            {
                if (col)
                {
                    std::cout << '#';
                }
                else
                {
                    std::cout << '.';
                }
            }
            std::cout << std::endl;
        }
    }
};

int main()
{
    std::vector<long> input = read_input_vl("./input/11/11.txt");
    State state;
    state.program = input;
    long color, turn;
    Robot rob;
    rob.grid.resize(128, std::vector<int>(128));

    state = computer(state);
    while (!state.halted)
    {
        if (state.waiting_for_input)
        {
            state.provide_input(rob.get_pos_color());
            state = computer(state);
        }
        color = state.read_output();
        turn = state.read_output();

        rob.paint(color);

        if (turn == 0)
        {
            rob.turn_left();
            rob.move();
        }
        else if (turn == 1)
        {
            rob.turn_right();
            rob.move();
        }
    }

    rob.print_grid();
    std::set<Point> painted(rob.path.begin(), rob.path.end());
    std::cout << "Part1 :" << painted.size() << std::endl;

    return 0;
}