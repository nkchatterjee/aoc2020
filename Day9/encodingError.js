const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n').filter(x => x).map(x => parseInt(x))

class Xmas {
  constructor(preamble) {
    this.array = preamble;
  }

  isValid(int) {
    for (let i = 0; i < this.array.length; i++) {
      for (let j = i + 1; j < this.array.length; j++) {
        if (this.array[i] + this.array[j] === int) {
          return true;
        }
      }
    }
    return false;
  }

  push(int) {
    this.array.push(int);
    this.array.shift();
  }
}

const preambleLength = 25
const xmas = new Xmas(lines.slice(0, preambleLength))
let invalid;
for (let i = preambleLength; i < lines.length; i++) {
  const element = lines[i];
  if (xmas.isValid(element)) {
    xmas.push(element);
  } else {
    invalid = element
    break;
  }
}

console.log(invalid);

// part 2
let weakness;

for (let l = 2; l < lines.length; l++) {
  for (let i = 0; i < lines.length - l + 1; i++) {
    let sum = 0;
    for (let j = 0; j < l; j++){
      sum += lines[i + j];
    }
    if (sum === invalid) {
      const len = lines.slice(i, i + l)
      weakness = Math.min(...len) + Math.max(...len);
    }
  }
}

console.log(weakness);