#include <iostream>
#include <vector>
#include <string>
#include <regex>
#include <tuple>

#include "utils/input.hpp"

struct Planet
{
    std::tuple<int, int, int> pos;
    std::tuple<int, int, int> vel;

    int &get_pos(const int i)
    {
        switch (i)
        {
        case 0:
            return std::get<0>(pos);
        case 1:
            return std::get<1>(pos);
        case 2:
            return std::get<2>(pos);
        default:
            perror("Invalid index");
            exit(EXIT_FAILURE);
        }
    };
    int &get_vel(const int i)
    {
        switch (i)
        {
        case 0:
            return std::get<0>(vel);
        case 1:
            return std::get<1>(vel);
        case 2:
            return std::get<2>(vel);
        default:
            perror("Invalid index");
            exit(EXIT_FAILURE);
        }
    };
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
    for (int i = 0; i != no_planets; i++)
    {
        for (int j = i + 1; j != no_planets; j++)
        {
            for (int k = 0; k != 3; k++)
            {
                if (planets[i].get_pos(k) < planets[j].get_pos(k))
                {
                    planets[i].get_vel(k) += 1;
                    planets[j].get_vel(k) -= 1;
                }
                else if (planets[i].get_pos(k) > planets[j].get_pos(k))
                {
                    planets[i].get_vel(k) -= 1;
                    planets[j].get_vel(k) += 1;
                }
            }
        }
    }
}

void apply_velocity(std::vector<Planet> &planets)
{
    for (int i = 0; i != planets.size(); i++)
    {
        planets[i].get_pos(0) += planets[i].get_vel(0);
        planets[i].get_pos(1) += planets[i].get_vel(1);
        planets[i].get_pos(2) += planets[i].get_vel(2);
    }
}

int get_energy(const std::vector<Planet> &planets)
{
    int energy = 0;
    for (Planet planet : planets)
    {
        energy +=
            (std::abs(planet.get_pos(0)) + std::abs(planet.get_pos(1)) + std::abs(planet.get_pos(2))) * (std::abs(planet.get_vel(0)) + std::abs(planet.get_vel(1)) + std::abs(planet.get_vel(2)));
    }
    return energy;
}

int hash(const Planet &planet)
{
    int hash = (hash + (324723947 + std::get<0>(planet.pos))) ^93485734985;
    hash = (hash + (324723947 + std::get<1>(planet.pos))) ^93485734985;
    hash = (hash + (324723947 + std::get<2>(planet.pos))) ^93485734985;
    hash = (hash + (324723947 + std::get<0>(planet.vel))) ^93485734985;
    hash = (hash + (324723947 + std::get<1>(planet.vel))) ^93485734985;
    hash = (hash + (324723947 + std::get<2>(planet.vel))) ^93485734985;
    
    return hash;
}

int main()
{
    std::vector<std::string> input = read_input_vs("./input/12/12.txt");
    std::vector<Planet> planets = get_planets(input);
    std::vector<int> initial_hashes;
    int steps = 1000;

    for (Planet planet : planets)
    {
        initial_hashes.push_back(hash(planet));
    } 
    
    for (int i = 0; i != steps; i++)
    {
        apply_gravity(planets);
        apply_velocity(planets);
    }
    
    std::cout << "Part 1: " << get_energy(planets) << std::endl;
    
    bool same = false;
    const int no_planets = planets.size();
    while(!same)
    {
        apply_gravity(planets);
        apply_velocity(planets);
        for (int i = 0; i != no_planets; i++)
        {
            same = initial_hashes[i] == hash(planets[i]);
            if (!same)
            {
                break;
            }
        }
        steps++;
    }
    std::cout << "Part 2: " << steps << std::endl;

}