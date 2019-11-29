#include <iostream>
#include <vector>
#include <string>
#include <fstream>
#include <unordered_set>

using namespace std;

vector<string> read_input(const string &filename)
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

int problem_1(const vector<string> &changes)
{
    int sum{0};
    for (const string &change : changes)
    {
        switch (change[0])
        {
        case '+':
            sum += stoi(change.substr(1));
            break;
        case '-':
            sum -= stoi(change.substr(1));
            break;
        }
    }
    return sum;
}

int problem_2(const vector<string> &changes)
{
    const int vsize = changes.size();
    int sum{0};
    unordered_set<int> history{0};
    int el{0};
    while (true)
    {
        const string &change = changes[el];
        switch (change[0])
        {
        case '+':
            sum += stoi(change.substr(1));
            break;
        case '-':
            sum -= stoi(change.substr(1));
            break;
        }
        if (history.count(sum) > 0)
        {
            return sum;
        }
        history.insert(sum);
        el = (el + 1) % vsize;
    }
}

int main()
{
    const vector<string> changes{read_input("input.txt")};

    cout << problem_1(changes) << endl;
    cout << problem_2(changes) << endl;
}