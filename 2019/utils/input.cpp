#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <sstream>
#include <memory>

std::vector<std::string> read_input_vs(const std::string &filename)
{
    std::ifstream input{filename};

    if (!input.is_open())
    {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    std::string line;
    std::vector<std::string> lines;
    while (getline(input, line))
    {
        lines.push_back(line);
    }

    return lines;
}

std::vector<long> read_input(const std::string &filename)
{
    std::ifstream input{filename};

    if (!input.is_open())
    {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    std::string line;
    getline(input, line);
    std::istringstream oss(line);
    std::string val;

    std::vector<long> result;
    while (getline(oss, val, ','))
    {
        result.push_back(std::stol(val));
    }

    return result;
}