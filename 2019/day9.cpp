#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include "intcode.hpp"
#include "utils/input.hpp"

int main()
{
    const std::vector<long> input = read_input_vl("./input/9/9.txt");
    const std::vector<long> example = {109, 1, 204, -1, 1001, 100, 1, 100, 1008, 100, 16, 101, 1006, 101, 0, 99};
    const std::vector<long> example2 = {1102, 34915192, 34915192, 7, 4, 7, 99, 0};
    const std::vector<long> example3 = {104, 1125899906842624, 99};

    std::cout << computer(input) << std::endl;
}
