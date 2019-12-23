#include <iostream>
#include <vector>
#include <deque>
#include <tuple>
#include <set>
#include <string>
#include <algorithm>

#include "utils/input.hpp"


#include <memory>
enum Instruction
{
    ADD,
    MULTIPLY,
    INPUT,
    OUTPUT,
    HALT,
    JUMP_NONZERO,
    JUMP_ZERO,
    LT_TEST,
    EQ_TEST,
    ADJUST_REL
};

enum Mode
{
    POSITION,
    IMMEDIATE,
    RELATIVE
};

class Operation
{
public:
    Operation(){};
    Operation(const int instr, const int rel_base)
    {
        std::unique_ptr<char[]> buffer(new char[6]);
        sprintf(&buffer[0], "%05d", instr);
        std::string val = std::string(buffer.get());
        relative_base = rel_base;

        a_mode = get_mode(val[0]);
        b_mode = get_mode(val[1]);
        c_mode = get_mode(val[2]);

        switch (instr % 100)
        {
        case 1:
            instruction = ADD;
            parameters = 3;
            break;
        case 2:
            instruction = MULTIPLY;
            parameters = 3;
            break;
        case 3:
            instruction = INPUT;
            parameters = 1;
            break;
        case 4:
            instruction = OUTPUT;
            parameters = 1;
            break;
        case 5:
            instruction = JUMP_NONZERO;
            parameters = 2;
            break;
        case 6:
            instruction = JUMP_ZERO;
            parameters = 2;
            break;
        case 7:
            instruction = LT_TEST;
            parameters = 3;
            break;
        case 8:
            instruction = EQ_TEST;
            parameters = 3;
            break;
        case 9:
            instruction = ADJUST_REL;
            parameters = 1;
            break;
        case 99:
            instruction = HALT;
            parameters = 0;
            break;
        default:
            std::cout << "Warning: Invalid instruction " << instr % 100 << std::endl;
            instruction = HALT;
            parameters = 0;
        }
    };
    Instruction instruction;
    int parameters = 0;
    int index_a(const int pos, const std::vector<long> &input, const bool for_writing = false)
    {
        return index(a_mode, pos + 3, input, for_writing);
    }
    int index_b(const int pos, const std::vector<long> &input, const bool for_writing = false)
    {
        return index(b_mode, pos + 2, input, for_writing);
    }
    int index_c(const int pos, const std::vector<long> &input, const bool for_writing = false)
    {
        return index(c_mode, pos + 1, input, for_writing);
    }

    void print_debug()
    {
        std::cout << "Instruction: " << instruction << std::endl;
        std::cout << "Parameters: " << parameters << std::endl;
        std::cout << "Relative base: " << relative_base << std::endl;
        std::cout << "-------------------" << std::endl;
        std::cin.get();
    }

private:
    int relative_base;
    Mode a_mode = POSITION, b_mode = POSITION, c_mode = POSITION;
    Mode get_mode(const char val)
    {
        switch (val)
        {
        case '1':
            return IMMEDIATE;
        case '2':
            return RELATIVE;
        default: // '0'
            return POSITION;
        }
    }
    int index(const Mode mode, const int pos, const std::vector<long> &input, const bool for_writing)
    {
        if (mode == RELATIVE)
        {
            return relative_base + input.at(pos);
        }
        else if (mode == IMMEDIATE && !for_writing)
        {
            return pos;
        }
        else
        { //POSITION
            return input.at(pos);
        }
    }
};

struct State
{
    int index = 0;
    std::vector<long> program{};
    int relative_base = 0;
    std::deque<long> diagnostic_codes;
    int input_index = 0;
    bool waiting_for_input = false;
    bool halted = false;
    void provide_input(int arg);
    long read_output();
};

void State::provide_input(int arg)
{
    program.at(input_index) = arg;
    waiting_for_input = false;
}
long State::read_output()
{
    if (diagnostic_codes.size() < 1) { return -1; }
    const long ret = diagnostic_codes.front();
    diagnostic_codes.pop_front();
    return ret;
}

State computer(State &state)
{
    Operation op;
    std::vector<long> &program = state.program;

    for (int i = state.index; i < program.size();)
    {
        op = Operation(program.at(i), state.relative_base);
        //op.print_debug();

        switch (op.instruction)
        {
        case ADD:
            program.at(op.index_a(i, program, true)) = program.at(op.index_c(i, program)) + program.at(op.index_b(i, program));
            i += op.parameters + 1;
            break;
        case MULTIPLY:
            program.at(op.index_a(i, program, true)) = program.at(op.index_c(i, program)) * program.at(op.index_b(i, program));
            i += op.parameters + 1;
            break;
        case INPUT:
            state.input_index = op.index_c(i, program, true);
            state.index = i + op.parameters + 1;
            state.waiting_for_input = true;
            return state;
            break;
        case OUTPUT:
            state.diagnostic_codes.push_back(program.at(op.index_c(i, program)));
            // cout << "Diagnostic code: " << program.at(op.index_c(i, program)) << endl;
            i += op.parameters + 1;
            break;
        case JUMP_NONZERO:
            i = (program.at(op.index_c(i, program)) != 0) ? program.at(op.index_b(i, program)) : i + op.parameters + 1;
            break;
        case JUMP_ZERO:
            i = (program.at(op.index_c(i, program)) == 0) ? program.at(op.index_b(i, program)) : i + op.parameters + 1;
            break;
        case LT_TEST:
            program.at(op.index_a(i, program, true)) = (program.at(op.index_c(i, program)) < program.at(op.index_b(i, program))) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case EQ_TEST:
            program.at(op.index_a(i, program, true)) = (program.at(op.index_c(i, program)) == program.at(op.index_b(i, program))) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case ADJUST_REL:
            state.relative_base += program.at(op.index_c(i, program));
            i += op.parameters + 1;
            break;
        case HALT:
            // cout << "Halted " << endl;
            state.halted = true;
            return state;
        default:
            return state;
        }
    }
    return state;
}


using Point = std::pair<int, int>;

enum Direction
{
    N,
    E,
    S,
    W
};

const std::vector<Direction> directions = {N, E, S, W};

struct Robot
{
    std::vector<std::vector<bool>> grid;
    Point pos;
    Direction dir = N;
    std::vector<Point> path;

    void turn_right()
    {
        const int idx = (std::find(directions.begin(), directions.end(), dir) - directions.begin() + 1) % 4;
        dir = directions[idx];
    }
    void turn_left()
    {
        const int idx = (std::find(directions.begin(), directions.end(), dir) - directions.begin() - 1);
        dir = directions[idx == -1 ? 3 : idx];
    }
    void paint(const int color)
    {
        grid.at(pos.first).at(pos.second) = (color == 1);
        std::cout << pos.first << ", " << pos.second << std::endl;
        path.push_back(pos);
    }

    void move()
    {
        switch (dir)
        {
        case N:
            pos = {pos.first, pos.second + 1};
            break;
        case S:
            pos = {pos.first, pos.second - 1};
            break;
        case E:
            pos = {pos.first + 1, pos.second};
            break;
        case W:
            pos = {pos.first - 1, pos.second};
            break;
        }
    }
    int get_pos_color()
    {
        return grid.at(pos.first).at(pos.second) ? 1 : 0;
    }
    void print_grid()
    {
        for (auto row : grid)
        {
            for (auto col : row)
            {
                if (col)
                {
                    std::cout << '#';
                }
                else
                {
                    std::cout << '.';
                }
            }
            std::cout << std::endl;
        }
    }
};

void start(Robot &rob, State &state)
{
    long color, turn;

    state = computer(state);
    while (!state.halted)
    {
        if (state.waiting_for_input)
        {
            // int user_input;
            // std::cout << "Enter number: ";
            // std::cin >> user_input;
            // state.provide_input(user_input);
            state.provide_input(rob.get_pos_color());
            state = computer(state);
        }
        color = state.read_output();
        turn = state.read_output();

        rob.paint(color);

        if (turn == 0)
        {
            rob.turn_left();
            rob.move();
        }
        else if (turn == 1)
        {
            rob.turn_right();
            rob.move();
        }
    }
}

int part1(const std::vector<long> &input)
{
    State state;
    state.program = input;
    Robot rob;
    rob.grid.resize(128, std::vector<bool>(128));
    rob.pos = {64, 64};
    start(rob, state);
    std::set<Point> painted(rob.path.begin(), rob.path.end());
    return painted.size();
}

void part2(const std::vector<long> &input)
{
    State state;
    state.program = input;
    Robot rob;
    rob.grid.resize(128, std::vector<bool>(128));
    rob.pos = {64, 64};
    rob.grid.at(64).at(64) = true;
    start(rob, state);
    rob.print_grid();
}

int main()
{
    std::vector<long> input = read_input_vl("./input/11/11.txt");

    // std::cout << "Part1 :" << part1(input) << std::endl;
    std::cout << "Part2 :" << std::endl;
    part2(input);

    return 0;
}