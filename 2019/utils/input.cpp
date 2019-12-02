#include <iostream>
#include <vector>
#include <string>
#include <fstream>

using namespace std;

vector<string> read_input_vs(const string &filename)
{
    ifstream input{filename};

    if (!input.is_open())
    {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    string line;
    vector<string> lines;
    while (getline(input, line))
    {
        lines.push_back(line);
    }

    return lines;
}

vector<int> read_input_vi(const string &filename)
{
    ifstream input{filename};

    if (!input.is_open())
    {
        perror("Error opening file");
        exit(EXIT_FAILURE);
    }

    string line;
    vector<int> result;
    int start = 0, end;
    getline(input, line);
    while ((end = line.find(',', start)) != string::npos)
    {
        result.push_back(stoi(line.substr(start, end - start)));
        start = end + 1;
    }
    return result;
}