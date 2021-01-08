import math

with open("./input", 'r') as f:
    lines = f.read().splitlines() 

routes = ((1, 1), (3, 1), (5, 1), (7, 1), (1, 2))

total = []
for route in routes:
    c = 0
    for v in range(0, len(lines), route[1]):
        h = int(divmod((v / route[1]) * route[0], len(lines[v]))[1])
        value = lines[v][h]
        if value == "#":
            c += 1
    total.append(c)

print("Solution 1 =>", total[1])
# print("Solution 2 =>", math.prod(total))

from functools import reduce
import operator
print("Solution 2 =>", reduce(operator.mul, total, 1))
