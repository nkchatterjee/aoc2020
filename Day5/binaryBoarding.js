const fs = require('fs')
const lines = fs.readFileSync('input', {encoding: 'utf-8'}).split('\n')

all_seats = lines.map(line => parseInt(line.replace(/B/g, '1').replace(/F/g, '0').replace(/R/g, '1').replace(/L/g, '0'), 2))

console.log(`Part 1: The highest seat is ${Math.max(...all_seats)}.`)

all_seats.sort((a, b) => a - b)

for (let i = 0; i < all_seats.length; i++) {
  if (all_seats[i + 1] - all_seats[i] > 1) {
    let your_seat = all_seats[i] + 1;
    console.log(`Part 2: Your seat is ${your_seat}.`);
    break;
  }
}

// // using a class
// function stringToInt(str) {
//   return parseInt([...str].map(x => x === 'B' || x === 'R' ? 1 : 0).join(''), 2)
// }

// class Seat {
//   constructor(string) {
//     this.id = stringToInt(string)
//   }
// }

// const seats = []

// for (const line of lines) {
//   const s = new Seat(line)
//   seats.push(s.id)
// }

// console.log(Math.max(...seats))