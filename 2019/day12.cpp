#include <iostream>
#include <vector>
#include <string>
#include <regex>
#include <tuple>

#include "utils/input.hpp"

struct Planet
{
    std::array<int, 3> pos;
    std::array<int, 3> vel;
};

std::vector<Planet> get_planets(const std::vector<std::string> &input)
{
    std::vector<Planet> planets;
    std::regex pat{R"(<x=(-?\d+), y=(-?\d+), z=(-?\d+)>)"};
    std::smatch match;

    for (std::string line : input)
    {
        regex_search(line, match, pat);
        planets.push_back({{std::stoi(match.str(1)), std::stoi(match.str(2)), std::stoi(match.str(3))}, {0, 0, 0}});
    }

    return planets;
}

void apply_gravity(std::vector<Planet> &planets)
{
    const int no_planets = planets.size();
    for (int i = 0; i != no_planets; ++i)
    {
        for (int j = i + 1; j != no_planets; ++j)
        {
            for (int k = 0; k != 3; ++k)
            {
                if (planets[i].pos[k] < planets[j].pos[k])
                {
                    planets[i].vel[k] += 1;
                    planets[j].vel[k] -= 1;
                }
                else if (planets[i].pos[k] > planets[j].pos[k])
                {
                    planets[i].vel[k] -= 1;
                    planets[j].vel[k] += 1;
                }
            }
        }
    }
}

void apply_velocity(std::vector<Planet> &planets)
{
    for (int i = 0; i != planets.size(); ++i)
    {
        planets[i].pos[0] += planets[i].vel[0];
        planets[i].pos[1] += planets[i].vel[1];
        planets[i].pos[2] += planets[i].vel[2];
    }
}

int get_energy(const std::vector<Planet> &planets)
{
    int energy = 0;
    for (Planet planet : planets)
    {
        energy +=
            (std::abs(planet.pos[0]) + std::abs(planet.pos[1]) + std::abs(planet.pos[2])) * (std::abs(planet.vel[0]) + std::abs(planet.vel[1]) + std::abs(planet.vel[2]));
    }
    return energy;
}

bool are_equal(const std::vector<Planet> &start, const std::vector<Planet> &state)
{
    for (int i = 0; i != start.size(); ++i)
    {
        if (!(start[i].pos == state[i].pos && start[i].vel == state[i].vel))
        {
            return false;
        }
    }
    return true;
}

int main()
{
    std::vector<std::string> input = read_input_vs("./input/12/12.txt");
    const std::vector<Planet> start = get_planets(input);
    auto planets = start;
    long steps = 1000;

    for (int i = 0; i != steps; ++i)
    {
        apply_gravity(planets);
        apply_velocity(planets);
    }

    std::cout << "Part 1: " << get_energy(planets) << std::endl;

    while (!are_equal(start, planets))
    {
        apply_gravity(planets);
        apply_velocity(planets);
        ++steps;
    }
    std::cout << "Part 2: " << steps << std::endl;
}