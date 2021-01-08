import re

with open("input") as f:
  # passports are separated by blank line
  data = f.read().split("\n\n")

required_keys =['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
out, out2 = 0, 0

for passport in data:
  # key:value pairs are separated by spaces and newlines
  # replacing those which separate key:value pairs with ", "
  row = re.sub(r'[\n ]{1,}', ", ", passport) + ","
  # extracting key: value pairs from the passport
  # re.findall will return a list of tuples where each tuple has two elements key and value respectively
  # dict function will generate a dictonary from those list of tuples
  d = dict(re.findall(r'([a-z]+):(.*?),', row))
  # if all required keys are present in the passport
  if all([key in d.keys() for key in required_keys]):
    out += 1
    # checking validation
    if (2002 >= int(d['byr']) >= 1920 
      and 2020 >= int(d['iyr']) >= 2010 
      and 2030 >= int(d['eyr']) >= 2020 
      and d['ecl'] in ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"] 
      and re.search(r'^#[0-9a-f]{6}$', d['hcl']) 
      and re.match(r'^\d{9}$', d['pid'])):
        
      height = d['hgt']
      if (height[-2:] == 'cm' and 150 <= int(height[:-2]) <= 193) or (height[-2:] == 'in' and 59 <= int(height[:-2]) <= 76):
        out2 += 1

print('There are %d valid passports according to part 1.' % out)

# byr (Birth Year) - four digits; at least 1920 and at most 2002.
# iyr (Issue Year) - four digits; at least 2010 and at most 2020.
# eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
# hgt (Height) - a number followed by either cm or in:
# If cm, the number must be at least 150 and at most 193.
# If in, the number must be at least 59 and at most 76.
# hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
# ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
# pid (Passport ID) - a nine-digit number, including leading zeroes.
# cid (Country ID) - ignored, missing or not.

print('There are %d valid passports according to part 2.' % out2)