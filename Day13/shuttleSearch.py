with open('input.txt', "r") as file_input:
    lines = file_input.read().splitlines()

buses = lines[1].split(',')
print(buses)

# More efficient if list of buses was ordered from highest to lowest, the iterator would be the necessary remainder of the first bus, the increment would be the first bus and the first element of the list wouldn't be iterated

def part2(buses):
    mods = {}
    for idx, bus in enumerate(buses):
        if bus != 'x':
            bus = int(bus)
            mods[bus] = -idx % bus

    iterator = 0
    increment = 1
    for bus in mods.keys():
        while iterator % bus != mods[bus]:
            iterator += increment
        increment *= bus

    return iterator

print(part2(buses))