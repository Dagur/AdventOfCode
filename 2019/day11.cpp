#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
#include <set>
#include <string>
#include <algorithm>

#include "utils/input.hpp"
#include "intcode.hpp"

using Point = std::pair<int, int>;

enum class Direction
{
    N,
    E,
    S,
    W
};

struct Robot
{
    std::vector<std::vector<bool>> grid;
    Point pos;
    Direction dir = Direction::N;
    std::vector<Point> path;

    void turn_right()
    {
        switch (dir)
        {
        case Direction::N:
            dir = Direction::E;
            break;
        case Direction::E:
            dir = Direction::S;
            break;
        case Direction::S:
            dir = Direction::W;
            break;
        case Direction::W:
            dir = Direction::N;
            break;
        }
    }
    void turn_left()
    {
        switch (dir)
        {
        case Direction::N:
            dir = Direction::W;
            break;
        case Direction::E:
            dir = Direction::N;
            break;
        case Direction::S:
            dir = Direction::E;
            break;
        case Direction::W:
            dir = Direction::S;
            break;
        }
    }
    void paint(const int color)
    {
        grid.at(pos.first).at(pos.second) = (color == 1);
        // std::cout << pos.first << ", " << pos.second << std::endl;
        path.push_back(pos);
    }

    void move()
    {
        switch (dir)
        {
        case Direction::N:
            pos = {pos.first, pos.second + 1};
            break;
        case Direction::S:
            pos = {pos.first, pos.second - 1};
            break;
        case Direction::E:
            pos = {pos.first + 1, pos.second};
            break;
        case Direction::W:
            pos = {pos.first - 1, pos.second};
            break;
        }
    }
    int get_pos_color()
    {
        return grid.at(pos.first).at(pos.second) ? 1 : 0;
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

void start(Robot &rob, State &state)
{
    long color, turn;

    state = computer(state);
    while (!state.halted)
    {
        if (state.waiting_for_input)
        {
            // int user_input;
            // std::cout << "Enter number: ";
            // std::cin >> user_input;
            // state.provide_input(user_input);
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
}

int part1(const std::vector<long> &input)
{
    State state;
    state.program = input;
    state.program.resize(state.program.size() * 4);
    Robot rob;
    rob.grid.resize(128, std::vector<bool>(128));
    rob.pos = {64, 64};
    start(rob, state);
    std::set<Point> painted(rob.path.begin(), rob.path.end());
    return painted.size();
}

void part2(const std::vector<long> &input)
{
    State state;
    state.program = input;
    state.program.resize(state.program.size() * 4);
    Robot rob;
    rob.grid.resize(128, std::vector<bool>(128));
    rob.pos = {64, 64};
    rob.grid.at(64).at(64) = true;
    start(rob, state);
    rob.print_grid();
}

int main()
{
    std::vector<long> input = read_input_vl("./input/11/11.txt");

    std::cout << "Part1 :" << part1(input) << std::endl;
    std::cout << "Part2 :" << std::endl;
    part2(input);

    return 0;
}