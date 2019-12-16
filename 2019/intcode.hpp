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

struct State
{
    int index = 0;
    std::vector<long> program {};
    int relative_base = 0;
    long diagnostic_code = 0;
    int input_index = 0;
    bool waiting_for_input = false;
    bool halted = false;
    void provide_input(int arg);
};


State computer(State &state);
