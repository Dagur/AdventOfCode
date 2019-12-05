#include <memory>
#include "utils/input.cpp"

using namespace std;

enum Instruction
{
    ADD,
    MULTIPLY,
    INPUT,
    OUTPUT,
    HALT
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

        if (val[0] == '1')
        {
            mode_a = 1;
        }
        if (val[1] == '1')
        {
            mode_b = 1;
        }
        if (val[2] == '1')
        {
            mode_c = 1;
        }

        switch (instr % 100)
        {
        case 01:
            instruction = ADD;
            parameters = 3;
            break;
        case 02:
            instruction = MULTIPLY;
            parameters = 3;
            break;
        case 03:
            instruction = INPUT;
            parameters = 1;
            break;
        case 04:
            instruction = OUTPUT;
            parameters = 1;
            break;
        default: // 99
            instruction = HALT;
            parameters = 0;
            break;
        }
    };
    Instruction instruction;
    int mode_a = 0, mode_b = 0, mode_c = 0, parameters;
};

int computer(vector<int> input)
{
    Operation op;
    int user_input;

    for (int i = 0; i < input.size();)
    {
        cout << "Instruction: " << input[i] << endl;
        op = Operation(input[i]);

        switch (op.instruction)
        {
        case ADD:
            input[op.mode_c == 1 ? i + 3 :  input[i + 3]] = input[op.mode_a == 1 ? i + 1 :  input[i + 1]] + input[op.mode_b == 1 ? i + 2 :  input[i + 2]];
            i += op.parameters + 1;
            break;
        case MULTIPLY:
            input[op.mode_c == 1 ? i + 3 :  input[i + 3]] = input[op.mode_a == 1 ? i + 1 :  input[i + 1]] * input[op.mode_b == 1 ? i + 2 :  input[i + 2]];
            i += op.parameters + 1;
            break;
        case INPUT:
            i += op.parameters + 1;
            cin >> user_input;
            input[i+1] = user_input;
            break;
        case OUTPUT:
            cout << "Diagnostic code: " << input[i+1] << endl;
            i += op.parameters + 1;
            break;
        case HALT:
            cout << "Halted " << endl;
            return 0;
        default:
            cout << "Invalid instruction " << input[i] << endl;
            return 1;
        }
    }

    return 1;
}

int part1(const vector<int> &input)
{
    return computer(input);
}

int main()
{
    const vector<int> input = read_input_vi("./input/5/5.txt");

    cout << "Part 1: " << part1(input) << endl;
    // cout << "Part 2: " << part2(input) << endl;
}