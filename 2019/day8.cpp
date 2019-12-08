#include <vector>
#include <string>
#include <iostream>

#include "utils/input.hpp"

struct Layer
{
    std::string pixels = "";
    int number_of_0 = 0;
    int number_of_1 = 0;
    int number_of_2 = 0;
};

std::vector<Layer> get_layers(const std::string &input, const int width, const int height)
{
    const int chs_in_a_layer = width * height;
    int layer_count = 0;
    int ch_count = 0;
    std::vector<Layer> layers;

    for (char val : input)
    {
        if (ch_count == 0)
        {
            layers.push_back({"", 0, 0, 0});
        }

        layers[layer_count].pixels += val;

        switch (val)
        {
        case '0':
            layers[layer_count].number_of_0 += 1;
            break;
        case '1':
            layers[layer_count].number_of_1 += 1;
            break;
        case '2':
            layers[layer_count].number_of_2 += 1;
            break;
        }
        ch_count++;
        if (ch_count == chs_in_a_layer)
        {
            layer_count++;
            ch_count = 0;
        }
    }

    return layers;
}

char get_color(const std::vector<Layer> layers, int pos)
{
    for (Layer layer : layers)
    {
        switch (layer.pixels[pos])
        {
        case '0':
            return ' ';
        case '1':
            return 'x';
        }
    }
    return '_';
}

int part1(const std::vector<Layer> &layers)
{
    int lowest_0_count = -1, result = 0;
    for (auto layer : layers)
    {
        if (lowest_0_count == -1 || layer.number_of_0 < lowest_0_count)
        {
            lowest_0_count = layer.number_of_0;
            result = layer.number_of_1 * layer.number_of_2;
        }
    }
    return result;
}

void part2(const std::vector<Layer> &layers, const int width, const int height)
{
    std::vector<std::vector<int>> image;

    for (int y = 0; y != height; y++)
    {
        for (int x = 0; x != width; x++)
        {
            std::cout << get_color(layers, x + ((y % height) * width));
        }
        std::cout << std::endl;
    }
}

int main()
{
    constexpr int width = 25, height = 6;
    std::string input = read_input_vs("./input/8/8.txt")[0];
    const std::vector<Layer> layers = get_layers(input, width, height);

    std::cout << "Part 1: " << part1(layers) << std::endl;
    std::cout << "Part 2:" << std::endl;
    part2(layers, width, height);
}