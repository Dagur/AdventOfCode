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
    Operation(const int instr);
    Instruction instruction;
    int parameters;
    int index_a(const int offset, const std::vector<long> &input);

    int index_b(const int offset, const std::vector<long> &input);

    int index_c(const int offset, const std::vector<long> &input);

};

long computer(std::vector<long> input, std::deque<long> args = {});