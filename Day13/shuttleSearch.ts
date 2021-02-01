const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

// part 1

const earliestDepartureAt = parseInt(lines[0]);

// Extract `busIds`. We can ignore entries with `"x"`. 
const busIds = lines[1]
  .split(",")
  .filter((busId) => busId !== "x")
  .map((busId) => parseInt(busId));

const departureTimes = busIds.map((busId) => {
  let departureTime = earliestDepartureAt;

  // If this modulo operation does not return 0, the bus does not depart at the current time.
  // Thus, we increase the time and retry.
  while (departureTime % busId) {
    departureTime++;
  }

  return departureTime;
});

// We've determined the departure times for all busses.
// Now, we can retrieve the earliest departure and bus.
const departureAt = Math.min(...departureTimes);
const busId = busIds[departureTimes.indexOf(departureAt)];

console.log(busId * (departureAt - earliestDepartureAt));

// part 2

// Extract `busIds`. Entries with `"x"` are used as if they had an ID of 1.
const busIds2 = lines[1].split(",").map((busId) => {
  return busId !== "x" ? parseInt(busId) : 1;
});

let step = busIds2[0];
let timestamp = 0;

// Modify `step` in a way, that it takes each bus into consideration.
// Therefore, we can use the least common multiple.
busIds2.forEach((busId, i) => {
  if (busId === 1 || busId === step) return;

  while ((timestamp + i) % busId !== 0) {
    timestamp += step;
  }

  step = lcm(step, busId);
});

console.log(timestamp);

// Least common multiple
function lcm(a: number, b: number): number {
  if ([a, b].includes(0)) return 0;
  return Math.abs((a * b) / gcd(a, b));
}
// Greatest common divisor
function gcd(a: number, b: number): number {
  if (!b) return Math.abs(a);
  return gcd(b, a % b);
}