#include <iostream>
#include <vector>
#include <string>
#include <fstream>

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

std::vector<int> read_input_vi(const std::string &filename)
{
    std::ifstream input{filename};

    if (!input.is_open())
    {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    std::string line;
    std::vector<int> result;
    int start = 0, end;
    getline(input, line);
    while ((end = line.find(',', start)) != std::string::npos)
    {
        result.push_back(stoi(line.substr(start, end - start)));
        start = end + 1;
    }
    return result;
}