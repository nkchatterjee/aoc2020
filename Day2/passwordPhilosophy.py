def partOne(low, high, letter, password):
    count = 0
    for char in password:
        if char == letter:
            count += 1
    return high >= count >= low


def partTwo(position1, position2, letter, password):
    return (password[position1] == letter) ^ (password[position2] == letter)


out1 = 0
out2 = 0
with open("Problem-2/Day-2-Password-Philosophy.txt") as file:
    for line in file:
        freq, letter, password = line.split(" ")
        letter = letter[:len(letter) - 1]
        low, high = map(int, freq.split('-'))
        if partOne(low, high, letter, password):
            out1 += 1
        if partTwo(low - 1, high - 1, letter, password):
            out2 += 1

print(out1, out2)