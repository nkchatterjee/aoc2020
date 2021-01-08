lines = []
with open('input.txt') as file:
    for line in file:
        line = line.rstrip().split(' ')
        lines.append([line[0], int(line[1])])


def move(lines, part_1=False):
    seen = set()
    accumulator = 0
    idx = 0
    while True:
        if idx >= len(lines):
            return accumulator
        move, arg = lines[idx]
        if idx in seen:
            return accumulator if part_1 else False
        seen.add(idx)
        if move == 'nop':
            idx += 1
        elif move == 'acc':
            accumulator += arg
            idx += 1
        elif move == "jmp":
            idx += arg


def flip(val):
    return 'jmp' if val == 'nop' else 'nop'


def change_piece(lines):
    for idx, turn in enumerate(lines):
        if turn[0] == 'nop' or turn[0] == 'jmp':
            prev = turn[0]
            lines[idx][0] = flip(turn[0])
            if accumulator:= move(lines):
                return accumulator
            lines[idx][0] = prev

print("Part 1", move(lines, True))
print("Part 2", change_piece(lines))


# alt solution
def execute_program(lines):
    lines_executed = set()
    cursor = 0
    accumulator = 0

    def acc(lines, cursor, accumulator):
        return (cursor + 1, accumulator + int(lines[cursor][1]))

    def jmp(lines, cursor, accumulator):
        return (cursor + int(lines[cursor][1]), accumulator )

    def nop(lines, cursor, accumulator):
        return (cursor + 1, accumulator)

    terminated = False
    while not terminated and cursor not in lines_executed:
        instruction = lines[cursor][0]
        lines_executed.add(cursor)

        operations = {
            'jmp': jmp,
            'acc': acc,
            'nop': nop,
        }
        operation = operations[instruction]
        cursor, accumulator = operation(lines, cursor, accumulator)

        # Terminate if end at program
        terminated = cursor == len(lines)
    return terminated, accumulator

def part1(lines):
    _, result = execute_program(lines)
    return result
print(part1(lines))

def part2(lines):
    for i in range(len(lines)):
        # Copy lines so that changes don't persist.
        local_lines = [x for x in lines]

        # Switch statement jmp/nop
        if 'jmp' in local_lines[i][0]:
            local_lines[i] = ('nop', local_lines[i][1])
        elif 'nop' in local_lines[i][0]:
            local_lines[i] = ('jmp', local_lines[i][1])

        terminated, result = execute_program(local_lines)

        if terminated:
            break
    return result
print("Solution part 2: %d" % part2(lines))