#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include "intcode.hpp"
#include "utils/input.hpp"


int main()
{
    const std::vector<int> input = read_input_vi("./input/5/5.txt");

    computer(input);
}
