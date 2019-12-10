#include <iostream>
#include <vector>
#include <string>
#include <set>
#include "utils/input.hpp"

using Starmap = std::vector<std::string>;
using Point = std::pair<int, int>;

enum Direction
{
    N,
    NE,
    E,
    SE,
    S,
    SW,
    W,
    NW
};

std::vector<Point> get_points(const Starmap &map)
{
    std::vector<Point> res;
    const int rowlength = map.front().size();
    for (int i = 0; i != map.size(); i++)
    {
        for (int j = 0; j != rowlength; j++)
        {
            if (map[i][j] == '#')
            {
                res.push_back({j, i});
            }
        }
    }
    return res;
}

Direction get_direction(const Point &from, const Point &to)
{
    if (from.first == to.first)
    {
        return from.second < to.second ? N : S;
    }
    else if (from.first < to.first)
    {
        if (from.second == to.second)
        {
            return E;
        }
        else if (from.second < to.second)
        {
            return NE;
        }
        else
        {
            return SE;
        }
    }
    else
    {
        if (from.second == to.second)
        {
            return W;
        }
        else if (from.second < to.second)
        {
            return NW;
        }
        else
        {
            return SW;
        }
    }
}

int get_number_of_connections(const Point &point, const std::vector<Point> &asteroids)
{
    std::set<std::pair<float, Direction>> slopes;
    int above = 0, below = 0;
    float slope;
    Direction dir;
    for (Point p : asteroids)
    {
        if (p == point)
        {
            continue;
        }

        slope = (float)(p.second - point.second) / (float)(p.first - point.first);
        slopes.insert({slope, get_direction(point, p)});
    }
    return slopes.size();
}

int part1(const Starmap &map)
{
    const std::vector<Point> asteroids = get_points(map);
    int best = 0;
    int val;
    for (auto point : asteroids)
    {
        val = get_number_of_connections(point, asteroids);
        if (val > best)
        {
            best = val;
        }
    }
    return best;
}

int main()
{
    Starmap map = read_input_vs("./input/10/10.txt");

    std::cout << "Part 1: " << part1(map) << std::endl;
}