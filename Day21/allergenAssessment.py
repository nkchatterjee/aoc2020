import re
from collections import defaultdict
rule = re.compile("^((?:\w+ )+)\(contains (.*?)\)$")

data = open("input.txt").read().splitlines()
all_candidates = defaultdict(list)
all_ingredients = []
for line in data:
    ing_str, all_str = rule.match(line).groups()

    ingredients = ing_str.strip().split(" ")
    allergens = all_str.split(", ")

    for allergen in allergens:
        all_candidates[allergen].append(set(ingredients))

    all_ingredients.extend(ingredients)

candidates = {}
for allergen_name, ingredient_list in all_candidates.items():
    candidates[allergen_name] = set.intersection(*ingredient_list)

print("appearances", sum(all_ingredients.count(ingredient) for ingredient in set(all_ingredients).difference(set.union(*candidates.values()))))

confirmed = {}

while len(confirmed) < len(candidates):
    for allergen in candidates:
        new_set = candidates[allergen].difference(confirmed.values())

        if len(new_set) == 1:
            confirmed[allergen] = new_set.pop()

        candidates[allergen] = new_set

print(",".join(v for k, v in sorted(confirmed.items(), key=lambda item: item[0])))