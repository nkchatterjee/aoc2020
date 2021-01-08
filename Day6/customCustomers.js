const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

const groups = lines
  .join("\n")
  .split("\n\n")
  .map((group) => group.split("\n"));

// Part 1
return groups
  .map((group) => {
    // first join all answers per group which leaves us with a long string
    // then use the spread operator to split the string into an array where each item is a single character
    // then make new set to de-dupe
    const set = new Set([...group.join("")]);
    return set.size;
  })
  // we have to add those together
  .reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });

// Part 2
return groups
  .map((group) => {
    const set = new Set([...group.join("")]);

    return [...set].filter((character) => {
      return group.every((person) => person.includes(character));
    }).length;
  })
  .reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  });