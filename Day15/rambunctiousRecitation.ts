const fs = require('fs')
const input = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');


// Convert our input string into an array of numbers.
const startingNumbers = input
  .split(",")
  .map((startingNumber) => parseInt(startingNumber));

// Create a `spokenNumbers` map and add our starting numbers.
const spokenNumbers = new Map<number, number>();
startingNumbers.forEach((startingNumber, i) => {
  spokenNumbers.set(startingNumber, i + 1);
});

// Each turn a number is spoken. Thus, our current turn is the size of the map.
let turn = spokenNumbers.size;

// We have to keep track of the last number spoken. We can extract it from our map this time.
let lastNumberSpoken = [...spokenNumbers.keys()].pop()!;

// We should find the 30000000th number spoken. Therefore, we use this `while`-loop.
while (turn < 30000000) {
  // Start of a new turn.
  turn++;

  // Find the last time the last number was spoken.
  const lastTurn = turn - 1;

  // Find the second-to-last time the last number was spoken.
  const secondToLastTurn = spokenNumbers.get(lastNumberSpoken);

  // Update `spokenNumbers` here.
  // Thus, if we ever encounter the number again, the value refers to the `secondToLast` time.
  spokenNumbers.set(lastNumberSpoken, lastTurn);

  // Check if the last number has been spoken before.
  if (!secondToLastTurn) {
    // Update our last number spoken.
    // Don't update our `spokenNumbers` yet.
    lastNumberSpoken = 0;
    continue;
  }

  // Update our last number spoken.
  // Don't update our `spokenNumbers` yet.
  const age = lastTurn - secondToLastTurn;
  lastNumberSpoken = age;
}

console.log(lastNumberSpoken);