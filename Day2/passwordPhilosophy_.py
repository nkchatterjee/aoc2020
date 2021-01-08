def explode(line):
    policy, password = line.split(': ', 1)
    nums, letter = policy.split()
    a, b = map(int, nums.split('-'))
    return a, b, letter, password

def compliant(line):
    min, max, letter, password = explode(line)
    return min <= password.count(letter) <= max

def compliant2(line):
    p1, p2, letter, password = explode(line)
    return (password[p1-1] == letter) != (password[p2-1] == letter)

print(sum(1 for _ in filter(compliant, open('input'))))
print(sum(1 for _ in filter(compliant2, open('input'))))