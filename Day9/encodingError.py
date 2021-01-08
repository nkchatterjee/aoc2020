from collections import deque

def pair_is_summable_to(n, iterable):
    seen = set()
    for x in iterable:
        target = n - x
        if target in seen:
            return True
        seen.add(x)
    return False


def part1(lines,  preamble_len=25):
    queue = deque(lines[:preamble_len], preamble_len)
    for i, n in enumerate(lines[preamble_len:]):
        if pair_is_summable_to(n, queue):
            queue.append(n)
        else:
            return n, i


def part2(target_weakness, lines):
    # test all contiguous sets of length 2 then all of length 3 etc
    for test_len in range(2, len(lines)):
        queue = deque(lines[:test_len], test_len)
        for pos in range(test_len, len(lines)):
            if sum(queue) == target_weakness:
                w_0 = min(queue)
                w_1 = max(queue)
                return w_0+w_1, test_len, pos
            else: 
                queue.append(lines[pos])


lines = [int(l.strip()) for l in open('input.txt', 'r')]

target_weakness, at_row = part1(lines)
print(f"Part 1: result is {target_weakness} which is at line {at_row}")

weakness, seq_len, at_row = part2(target_weakness, lines)
print(f"Part 2: result is {weakness} from a sequence of length {seq_len} ending at row {at_row}")