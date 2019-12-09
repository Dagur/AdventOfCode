#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include "intcode.hpp"
#include "utils/input.hpp"


int main()
{
    const std::vector<long> input = read_input_vl("./input/5/5.txt");
    std::deque<long> args;

    computer(input, args);
}
