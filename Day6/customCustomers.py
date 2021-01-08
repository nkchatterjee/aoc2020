data = open("input.txt").read().split("\n\n")

sum = 0
for entry in data:
    # each entry has a new-line in it, so we need to strip that out
    # stick this in a set() which automatically treats each character as a separate member, and de-duplicates it for us.
    said_yes = set(entry.replace("\n",""))
    # the question requires summing the total of this
    sum += len(set(said_yes))
print("sum", sum)
# # in one line
# sum([len(set(entry.replace("\n",""))) for entry in open("input.txt").read().split("\n\n")])

total = 0
for entry in data:
    # creates group array with each element being a person's response
    items = entry.split()
    # set.intersection() method that takes an intersection of every set argument passed to it
    # this does same as: set.intersection(*[set(item) for item in items])
    # we are use splat to unpack arbitrary num of individuals in groups
    common = set.intersection(*map(set, items))
    # challenge wantsthe length of this set, and to sum the lengths of all entries, so it's a case of putting this in a loop, and summing the results
    total += len(common)
print("total", total)
# # one line
# sum(len(set.intersection(*map(set, entry.split()))) for entry in open("input.txt").read().split("\n\n"))