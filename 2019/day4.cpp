#include <iostream>
#include <sstream>
#include <regex>

using namespace std;

bool is_valid(const int val)
{
    stringstream ss;
    ss << val;
    char ch, prev = 0;
    bool adjacent = false, decrease = false;

    while (ss.get(ch))
    {
        adjacent = adjacent || ch == prev;
        decrease = decrease || prev > ch;
        prev = ch;
    }

    return (adjacent && !decrease);
}

bool has_double(const int val)
{
    regex pat{R"(1+|2+|3+|4+|5+|6+|7+|8+|9+|0+)", regex_constants::extended};
    smatch matches;
    const string text = to_string(val);
    string::const_iterator text_iter = text.cbegin();

    while (regex_search(text_iter, text.end(), matches, pat))
    {
        if (matches[0].length() == 2)
        {
            return true;
        }
        text_iter = matches[0].second;
    }

    return false;
}

int part1(const int start, const int end)
{
    int sum = 0;
    for (int i = start; i <= end; i++)
    {
        if (is_valid(i))
        {
            sum += 1;
        }
    }

    return sum;
}

int part2(const int start, const int end)
{
    int sum = 0;
    for (int i = start; i <= end; i++)
    {
        if (is_valid(i) && has_double(i))
        {
            sum += 1;
        }
    }
    return sum;
}

int main()
{
    constexpr int start = 246515, end = 739105;

    cout << "Part 1: " << part1(start, end) << endl;
    cout << "Part 2: " << part2(start, end) << endl;
}
