#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include "utils/input.hpp"

using namespace std;

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
        unique_ptr<char[]> buffer(new char[6]);
        sprintf(&buffer[0], "%05d", instr);
        string val = string(buffer.get());
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
            cout << "Warning: Invalid instruction " << instr % 100 << endl;
            instruction = HALT;
            parameters = 0;
        }
    };
    Instruction instruction;
    int parameters = 0;
    int index_a(const int pos, const vector<long> &input, const bool for_writing = false)
    {
        return index(a_mode, pos + 3, input, for_writing);
    }
    int index_b(const int pos, const vector<long> &input, const bool for_writing = false)
    {
        return index(b_mode, pos + 2, input, for_writing);
    }
    int index_c(const int pos, const vector<long> &input, const bool for_writing = false)
    {
        return index(c_mode, pos + 1, input, for_writing);
    }

    void print_debug()
    {
        cout << "Instruction: " << instruction << endl;
        cout << "Parameters: " << parameters << endl;
        cout << "Relative base: " << relative_base << endl;
        cout << "-------------------" << endl;
        cin.get();
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
    int index(const Mode mode, const int pos, const vector<long> &input, const bool for_writing)
    {
        if (mode == RELATIVE)
        {
            return relative_base + input[pos];
        }
        else if (mode == IMMEDIATE && !for_writing)
        {
            return pos;
        }
        else
        { //POSITION
            return input[pos];
        }
    }
};

struct State
{
    int index = 0;
    std::vector<long> program{};
    int relative_base = 0;
    long diagnostic_code = 0;
    int input_index = 0;
    bool waiting_for_input = false;
    bool halted = false;
    void provide_input(int arg);
};

void State::provide_input(int arg)
{
    program[input_index] = arg;
    waiting_for_input = false;
}

State computer(State &state)
{
    Operation op;
    std::vector<long> &program = state.program;

    for (int i = state.index; i < program.size();)
    {
        op = Operation(program[i], state.relative_base);
        //op.print_debug();

        switch (op.instruction)
        {
        case ADD:
            program[op.index_a(i, program, true)] = program[op.index_c(i, program)] + program[op.index_b(i, program)];
            i += op.parameters + 1;
            break;
        case MULTIPLY:
            program[op.index_a(i, program, true)] = program[op.index_c(i, program)] * program[op.index_b(i, program)];
            i += op.parameters + 1;
            break;
        case INPUT:
            state.input_index = op.index_c(i, program, true);
            state.index = i + op.parameters + 1;
            state.waiting_for_input = true;
            return state;
            break;
        case OUTPUT:
            state.diagnostic_code = program[op.index_c(i, program)];
            // cout << "Diagnostic code: " << state.diagnostic_code << endl;
            i += op.parameters + 1;
            break;
        case JUMP_NONZERO:
            i = (program[op.index_c(i, program)] != 0) ? program[op.index_b(i, program)] : i + op.parameters + 1;
            break;
        case JUMP_ZERO:
            i = (program[op.index_c(i, program)] == 0) ? program[op.index_b(i, program)] : i + op.parameters + 1;
            break;
        case LT_TEST:
            program[op.index_a(i, program, true)] = (program[op.index_c(i, program)] < program[op.index_b(i, program)]) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case EQ_TEST:
            program[op.index_a(i, program, true)] = (program[op.index_c(i, program)] == program[op.index_b(i, program)]) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case ADJUST_REL:
            state.relative_base += program[op.index_c(i, program)];
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
