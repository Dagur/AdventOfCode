#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
#include "intcode.hpp"
#include "utils/input.hpp"

int main()
{
    const std::vector<long> input = read_input("./input/5/5.txt");
    State state;
    state.program = input;
    int user_input;
    while (!state.halted)
    {
        state = computer(state);
        if (state.waiting_for_input)
        {
            std::cout << "Enter number: ";
            std::cin >> user_input;
            state.provide_input(user_input);
        }
    }
    std::cout << "Result: " << state.diagnostic_codes.back() << std::endl;
}
