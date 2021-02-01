const fs = require('fs');
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

class Seating {
  constructor(lines) {
    this.height = lines.length;
    this.width = lines[0].length;
    this.seats = lines;
  }

  nextState() {
    let hasChanged = false;
    // every time we update, we'll have a new seating chart
    const updatedSeats = [];

    // loop to check every row in the place
    this.seats.forEach((line, y) => {
      // the rows that will make up the new seating chart
      let updatedRow = '';

      // loop to check each seat in a row
      // each line is a str, spread operator is spreading each str into arr of str
      [...line].forEach((seat, x) => {
        // track total sum of occupied seats surrounding each seat
        let occupied = 0;
        // nested loop to check every seat adjacent to current seat
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            // skip the current seat
            if ((i != 0 || j != 0)
              && y + i >= 0
              && y + i < this.height
              && x + j >= 0
              && x + j < this.width
              && this.seats[y + i][x + j] === '#') {
                occupied++;
            }
          }
        }
        // if seat is empty and no surrounding occupied seats, seat becomes occupied
        if (seat === 'L' && occupied === 0) {
          updatedRow += '#';
          hasChanged = true;
        // if seat is occupied and 4+ surrounding occupied seats, seat becomes empty
        } else if (seat === '#' && occupied >= 4) {
          updatedRow += 'L';
          hasChanged = true;
        // else seat state doesn't changes
        } else {
          updatedRow += seat;
        }
      })
      updatedSeats.push(updatedRow);
    });

    // reset seating chart
    this.seats = updatedSeats;

    return hasChanged;
  }

  nextState2() {
    let hasChanged = false;

    const updatedSeats = [];

    this.seats.forEach((line, y) => {
      let updatedRow = '';

      [...line].forEach((seat, x) => {
        let occupied = 0;
        const directions = [
          {x: 1, y: 0}, {x: -1, y: 0},
          {x: 1, y: 1}, {x: -1, y: -1},
          {x: -1, y: 1}, {x: 1, y: -1},
          {x: 0, y: 1}, {x: 0, y: -1}
        ]

        directions.forEach(({x: dx, y: dy}) => {
          let posX = x + dx;
          let posY = y + dy;
          while(posX >= 0 && posY >= 0 && posX < this.width && posY < this.height) {
            if (this.seats[posY][posX] === '#') {
              occupied++;
              break;
            }
            if (this.seats[posY][posX] === 'L') {
              break;
            }
            posX += dx;
            posY += dy;
          }
        })
        
        if (seat === 'L' && occupied === 0) {
          updatedRow += '#';
          hasChanged = true;
        } else if (seat === '#' && occupied >= 5) {
          updatedRow += 'L';
          hasChanged = true;
        } else {
          updatedRow += seat;
        }
      })
      updatedSeats.push(updatedRow);
    });

    this.seats = updatedSeats;

    return hasChanged;
  }

  getOccupiedSeats() {
    let occupied = 0;
    this.seats.forEach(line => {
      [...line].forEach(seat => {
        if (seat === '#') occupied++;
      })
    })
    return occupied;
  }
}

const s = new Seating(lines);

while(s.nextState()) {
  // do nothing
}

console.log(s.getOccupiedSeats());

const s2 = new Seating(lines);

while(s2.nextState2()) {
  // do nothing
}

console.log(s2.getOccupiedSeats());