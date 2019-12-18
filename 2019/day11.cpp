#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
#include <set>
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
    std::vector<std::vector<bool>> grid;
    Direction dir = N;
    std::pair<int, int> pos = {64, 64};
    std::vector<std::pair<int, int>> path;
    std::set<std::pair<int, int>> painted;

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
    void paint(const bool is_white)
    {
        grid.at(pos.first).at(pos.second) = is_white;

        // if (std::find(path.begin(), path.end(), pos) == path.end())
        // {
        //     // std::cout << "(" << pos.first << ", " << pos.second << ")" << std::endl;
        //     paintCount++;
        // }
        painted.insert(pos);
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
                    std::cout << "##";
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
    std::vector<std::vector<bool>> grid;
    grid.resize(128, std::vector<bool>(128));
    Robot rob{grid};

    while (!state.halted)
    {
        state = computer(state);
        if (state.waiting_for_input)
        {
            // std::cout << "Enter number: ";
            // std::cin >> user_input;
            int inp = rob.get_pos_color();
            state.provide_input(inp);
        }

        turn = state.read_output();
        color = state.read_output();
        // std::cout << "Color to paint: " << color << std::endl;
        // std::cout << "Direction to turn: " << turn << std::endl;
        // std::cout << "Pos: " << rob.pos.first << ", " << rob.pos.second << std::endl;

        rob.paint(color == 1);

        if (turn == 0)
        {
            rob.turn_left();
        }
        else
        {
            rob.turn_right();
        }
        rob.move();
    }

    rob.print_grid();
    std::cout << "Part1 :" << rob.painted.size() << std::endl;

    return 0;
}