const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

class Game {
  constructor(input) {
    this.memory = new Map();
    this.turn = 1;

    input.forEach(number => {
      this.memory.set(number, this.turn);
      this.lastNumber = number;
      this.turn++;
    });
  }

  playUntilTurn(turn) {
    while (this.turn <= turn) {
      let newNumber; 
      if (this.memory.has(this.lastNumber)) {
        newNumber = this.turn - 1 - this.memory.get(this.lastNumber)
      } else {
        newNumber = 0;
      }
      this.memory.set(this.lastNumber, this.turn - 1)
      this.lastNumber = newNumber;
      this.turn++;
    }
  }
}

let g = new Game(lines[0].split(',').map(x => parseInt(x)));
g.playUntilTurn(30000000);
console.log(g.lastNumber);