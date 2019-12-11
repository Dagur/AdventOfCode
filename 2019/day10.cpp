#include <iostream>
#include <vector>
#include <string>
#include <set>
#include <tuple>
#include <map>
#include <unordered_map>
#include <math.h>
#include "utils/input.hpp"

using Point = std::pair<int, int>;

enum Quadrant
{
    NE,
    SE,
    SW,
    NW
};

std::vector<Point> get_points(const std::vector<std::string> &map)
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

Quadrant get_quadrant(const Point &center, const Point &point)
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
    std::set<std::pair<float, Quadrant>> slopes;
    float slope;
    for (Point p : asteroids)
    {
        if (p == point)
        {
            continue;
        }

        slope = (float)(p.second - point.second) / (float)(p.first - point.first);
        slopes.insert({slope, get_quadrant(point, p)});
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
    float slope, dist;
    double inf = std::numeric_limits<float>::infinity();
    double lowest = std::numeric_limits<float>::lowest();

    std::unordered_map<Quadrant, std::map<float, std::map<float, Point>>> cycle;
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

    int pointCount = 0;
    int res = 0;

    while (pointCount < 201)
    {
        for (Quadrant dir : {NE, SE, SW, NW})
        {
            for (auto slopeMap : cycle[dir])
            {
                auto asteroidsInLine = slopeMap.second;
                if (!asteroidsInLine.empty())
                {
                    pointCount += 1;
                    auto closest = (*asteroidsInLine.begin());
                    Point closestPoint = closest.second;
                    if (pointCount == 200)
                    {
                        res = closestPoint.first * 100 + closestPoint.second;
                    }
                    std::cout << pointCount << ": (" << closestPoint.first << ", "
                              << closestPoint.second << ")" << std::endl;
                    asteroidsInLine.erase(asteroidsInLine.begin());
                }
            }
        }
    }

    return res;
}

int main()
{
    std::vector<std::string> map = read_input_vs("./input/10/10.txt");
    const std::vector<Point> asteroids = get_points(map);

    int connections;
    Point station;
    std::tie(station, connections) = part1(asteroids);

    std::cout << "Part 1: (" << station.first << "," << station.second
              << ") connections: " << connections << std::endl;

    std::cout << "Part 2: " << part2(asteroids, station) << std::endl;
}