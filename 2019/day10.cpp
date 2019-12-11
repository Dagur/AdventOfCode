#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <tuple>
#include <map>
#include <unordered_map>
#include <math.h>
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

Direction get_quadrant(const Point &center, const Point &point)
{
    if (center.first <= point.first)
    {
        if (center.second > point.second)
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
        if (center.second > point.second)
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

std::pair<Point, int> part1(const std::vector<Point> &asteroids)
{
    std::pair<Point, int> best;
    int val;
    for (auto point : asteroids)
    {
        val = get_number_of_connections(point, asteroids);
        if (val > best.second)
        {
            best = {point, val};
        }
    }
    return best;
}

int part2(const std::vector<Point> &asteroids, const Point &station)
{
    int res = 0;
    int x = station.first;
    float slope, dist;
    double inf = std::numeric_limits<float>::infinity();
    double lowest = std::numeric_limits<float>::lowest();

    std::unordered_map<Direction, std::map<float, std::map<float, Point>>> cycle;
    for (Point point : asteroids)
    {
        if (point == station)
        {
            continue;
        }
        slope = (float)(station.second - point.second) / (float)(station.first - point.first);
        if (slope == inf)
        {
            slope = lowest;
        }
        dist = std::sqrt(std::pow(station.second - point.second, 2) + std::pow(station.first - point.first, 2));
        cycle[get_quadrant(station, point)][slope][dist] = point;
    }

    int sum = 0;

    while (sum < 36)
    {
        for (Direction dir : {NE, SE, SW, NW})
        {
            for (auto slopeMap : cycle[dir])
            {
                auto asteroidsInLine = slopeMap.second;
                if (!asteroidsInLine.empty())
                {
                    sum += 1;
                    auto nearestInLine = (*asteroidsInLine.begin());
                    if (sum == 200)
                    {
                        res = nearestInLine.second.first * 100 + nearestInLine.second.second;
                    }
                    std::cout << sum << ": (" << nearestInLine.second.first << ", " << nearestInLine.second.second << ")" << std::endl;
                    asteroidsInLine.erase(asteroidsInLine.begin());
                }
            }
        }
    }

    return res;
}

int main()
{
    Starmap map = read_input_vs("./input/10/10.txt");
    const std::vector<Point> asteroids = get_points(map);

    int connections;
    Point station;
    std::tie(station, connections) = part1(asteroids);
    
    std::cout << "Part 1: (" << station.first << "," << station.second
              << ") connections: " << connections << std::endl;

    std::cout << "Part 2: " << part2(asteroids, station) << std::endl;
}