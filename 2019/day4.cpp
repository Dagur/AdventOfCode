#include <iostream>
#include <sstream>

using namespace std;

bool is_valid(const int val)
{
    stringstream ss;
    ss << val;

    char c;
    char prev;
    bool repeat = false;
    bool no_decrease = true;

    while(ss.get(c)){
        repeat = prev == c;
        no_decrease = prev > c;
        prev = c;
    }

    return (repeat && no_decrease);
}

int part1(const int start, const int end)
{
    cout << "test 1 " << false << "\n";
    cout << "test 1 " << is_valid(111111) << "\n";
    cout << "test 1 " << is_valid(223450) << "\n";
    cout << "test 1 " << is_valid(123789) << "\n";

    return -1;
}


int main()
{
    // Manually narrowed range 246515-739105
    constexpr int start = 246666, end = 699999;

    cout << "Part 1: " << part1(start, end) << endl;
}