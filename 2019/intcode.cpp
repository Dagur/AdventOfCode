#include <memory>
#include <iostream>
#include <string>
#include <vector>
#include <deque>
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
    EQ_TEST
};

class Operation
{
public:
    Operation(){};
    Operation(const int instr)
    {
        unique_ptr<char[]> buffer(new char[6]);
        sprintf(&buffer[0], "%05d", instr);
        string val = string(buffer.get());

        a_immediate = val[0] == '1';
        b_immediate = val[1] == '1';
        c_immediate = val[2] == '1';

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
    int index_a(const int offset, const vector<int> &input)
    {
        return a_immediate ? offset + 3 : input[offset + 3];
    }
    int index_b(const int offset, const vector<int> &input)
    {
        return b_immediate ? offset + 2 : input[offset + 2];
    }
    int index_c(const int offset, const vector<int> &input)
    {
        return c_immediate ? offset + 1 : input[offset + 1];
    }

private:
    bool a_immediate = false, b_immediate = false, c_immediate = false;
};

int computer(vector<int> input, deque<int> args = {})
{
    Operation op;
    int user_input;
    int return_value = 0;

    for (int i = 0; i < input.size();)
    {
        op = Operation(input[i]);

        switch (op.instruction)
        {
        case ADD:
            input[op.index_a(i, input)] = input[op.index_c(i, input)] + input[op.index_b(i, input)];
            i += op.parameters + 1;
            break;
        case MULTIPLY:
            input[op.index_a(i, input)] = input[op.index_c(i, input)] * input[op.index_b(i, input)];
            i += op.parameters + 1;
            break;
        case INPUT:
            if (args.size() > 0) {
                user_input = args.front();
                args.pop_front();
            }
            else {
                cout << "Enter number: ";
                cin >> user_input;
            }
            input[input[i + 1]] = user_input;
            i += op.parameters + 1;
            break;
        case OUTPUT:
            return_value = input[op.index_c(i, input)];
            cout << "Diagnostic code: " << return_value << endl;
            i += op.parameters + 1;
            break;
        case JUMP_NONZERO:
            i = (input[op.index_c(i, input)] != 0) ? input[op.index_b(i, input)] : i + op.parameters + 1;
            break;
        case JUMP_ZERO:
            i = (input[op.index_c(i, input)] == 0) ? input[op.index_b(i, input)] : i + op.parameters + 1;
            break;
        case LT_TEST:
            input[op.index_a(i, input)] = (input[op.index_c(i, input)] < input[op.index_b(i, input)]) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case EQ_TEST:
            input[op.index_a(i, input)] = (input[op.index_c(i, input)] == input[op.index_b(i, input)]) ? 1 : 0;
            i += op.parameters + 1;
            break;
        case HALT:
            cout << "Halted " << endl;
            return return_value;
        default:
            return 1;
        }
    }

    return 1;
}
