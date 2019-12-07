#include <iostream>

constexpr int size = 20;

int move(int x, int y)
{
    if (x > size || y > size)
    {
        return 0;
    }
    if (x == size && y == size)
    {
        return 1;
    }

    return move(x + 1, y) + move(x, y + 1);
}

int main() 
{
    std::cout << "Result: " << move(0, 0) << std::endl;
}