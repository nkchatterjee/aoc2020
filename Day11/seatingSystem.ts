const fs = require('fs');
let plan = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

// Find `maxRow` and `maxColumn`.
// This way, we know when to stop looping.
const maxRow = plan.length - 1;
const maxColumn = plan[0].length - 1;

let hasChanges = false;

// Keep looping until no more changes are detected.
do {
  // Copy our initial plan. Seats change simultaneously.
  // So, we have to look at our initial plan and apply
  // changed to our new plan.
  const newPlan = plan.slice();

  // `true` if changes were necessary.
  hasChanges = false;

  // Check all seats in every row and column.
  for (let row = 0; row <= maxRow; row++) {
    for (let column = 0; column <= maxColumn; column++) {
      const seat = plan[row][column];

      // Floor (.) never changes.
      if (seat === ".") {
        continue;
      }

      const occupiedSeats = occupiedSeatsAdjacentTo(row, column, plan);

      // Check if a seat is empty (L) and there are no occupied seats adjacent to it.
      if (seat === "L" && occupiedSeats === 0) {
        hasChanges = true;
        toggleSeat(row, column, newPlan);
        continue;
      }

      // Check if a seat is occupied (#) and four or more seats adjacent to it are also occupied.
      if (seat === "#" && occupiedSeats >= 4) {
        hasChanges = true;
        toggleSeat(row, column, newPlan);
      }
    }
  }

  // Our new plan becomes our current plan for the next loop.
  plan = newPlan;
} while (hasChanges);

// Find the count of occupied seats.
console.log(plan.reduce((previousValue, currentValue) => {
  // Remove all empty seats and add number of occupied seats.
  return previousValue + currentValue.replace(/[^#]/g, "").length;
}, 0));
const directions = [
  // up
  [-1, 0],
  // down
  [1, 0],
  // left
  [0, -1],
  // right
  [0, 1],
  // up-left
  [-1, -1],
  // up-right
  [-1, 1],
  // down-left
  [1, -1],
  // down-right
  [1, 1],
];
function occupiedSeatsAdjacentTo(
  row: number,
  column: number,
  plan: string[]
): number {
  // Search in all directions.
  // Filter out directions where no occupied seat is adjacent.
  // After that, length of the array is the occupied seat count.
  return directions.filter(
    (direction) => plan[row + direction[0]]?.[column + direction[1]] === "#"
  ).length;
}
function toggleSeat(row: number, column: number, plan: string[]): void {
  // Toggle a seat's state from occupied to empty or vice versa.
  const newRow = [...plan[row]];
  newRow[column] = newRow[column] === "#" ? "L" : "#";
  plan[row] = newRow.join("");
}

// part 2
function occupiedSeatsVisibleFrom(
  row: number,
  column: number,
  plan: string[]
): number {
  // Search in all directions.
  // Filter out directions where no occupied seat is visible.
  // After that, length of the array is the occupied seat count.
  return directions.filter((direction) => {
    let factor = 0;

    // Use factor to keep moving forward into the current direction.
    // This way, we can see if, somewhere along the way, there is an occupied seat.
    while (true) {
      factor++;
      const seat =
        plan[row + direction[0] * factor]?.[column + direction[1] * factor];

      if (!seat || seat === "L") {
        return false;
      }

      if (seat === "#") {
        return true;
      }
    }
  }).length;
}