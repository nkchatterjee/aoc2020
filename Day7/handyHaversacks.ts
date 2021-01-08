import fs from 'fs';
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

type Bags = Record<string, Record<string, number>>;
const bags: Bags = {};

const regex1 = /^([a-z]+ [a-z]+) bags/;
const regex2 = /(\d) ([a-z]+ [a-z]+) bags?/g;

lines.forEach((line) => {
  // Use our first regex to extract the bag type.
  const match1 = regex1.exec(line);

  if (!match1) {
    // Should never happen.
    throw new Error();
  }

  // Get the type from the regex result.
  const type = match1[1];

  // Prepare an object to hold our bag contents information.
  const contents: Record<string, number> = {};

  // Add the bag to the dictionary.
  bags[type] = contents;

  // Now, we have to populate the bag's contents.
  // We'll use our second regex and reuse it as often as possible.
  // Each match is then added to the bag's contents.
  let match2 = regex2.exec(line);

  while (match2) {
    // Convert the count to a number. Easier to work with.
    const count = parseInt(match2[1]);
    const type = match2[2];

    // Add the bag type and count to the outer bag's contents.
    contents[type] = count;

    // Reuse the regex to match until there is nothing to match left.
    match2 = regex2.exec(line);
  }
});

Object.keys(bags).filter((type) => {
  return containsShinyGoldBags(bags, type);
}).length;

function containsShinyGoldBags(bags: Bags, type: string): boolean {
  const contents = bags[type];

  if (contents["shiny gold"]) {
    return true;
  }

  return Object.keys(contents).some((type) => {
    return containsShinyGoldBags(bags, type);
  });
}

// part 2
getBagCount(bags, "shiny gold");

function getBagCount(bags: Bags, type: string): number {
  let total = 0;

  const contents = bags[type];
  Object.entries(contents).forEach(([type, count]) => {
    total += count;
    total += getBagCount(bags, type) * count;
  });

  return total;
}