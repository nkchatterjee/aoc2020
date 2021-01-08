const fs = require('fs')
const lines = [0].concat(fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n'));

// Convert input to numbers and sort in ascending order.
const joltages = lines.map(Number).sort((a, b) => a - b);

// Add our device's built-in adapter.
const builtInJoltage = Math.max(...joltages) + 3;
joltages.push(builtInJoltage);

// part 2 solution only

// Prepare a map for a dynamic programming approach.
// Basically, we'll break down our problem into subproblems.
const sol = new Map<number, number>();
sol.set(0, 1);

// We'll use this to check for all differences.
const differences = [1, 2, 3];

// Check each joltage.
joltages.forEach((joltage) => {
  sol.set(joltage, 0);

  // Try with each possible jolt difference.
  // Also, add our precomputed value to find the distinct number of ways until here.
  differences.forEach((difference) => {
    if (sol.has(joltage - difference)) {
      sol.set(joltage, sol.get(joltage)! + sol.get(joltage - difference)!);
    }
  });
});

// Our total number of distinct ways is in the map's value for the maximum joltage.
console.log(sol.get(Math.max(...joltages))!);
