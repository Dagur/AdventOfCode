#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include "intcode.hpp"
#include "utils/input.hpp"

int main()
{
    std::deque<long> args;
    const std::vector<long> input = read_input_vl("./input/9/9.txt");
    std::cout << computer(input, args) << std::endl;
}
