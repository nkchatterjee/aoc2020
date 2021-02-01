const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

// part 1

class Program {
  constructor(input) {
    this.code = input;
    this.memory = new Map();
  }

  run() {
    this.code.forEach(line => {
      if (/^mask/.test(line)) {
        const {groups} = /^mask = (?<mask>.*)$/.exec(line);
        this.mask = [...groups.mask];
      } else {
        const {groups} = /^mem\[(?<address>\d+)\] = (?<decimal>\d+)$/.exec(line);
        let address = parseInt(groups.address);
        let decimal = parseInt(groups.decimal);
        // convert decimal to string with base 2 while considering mask
        let string = [...decimal.toString(2).padStart(36, '0')].map((value, index) => {
          if (this.mask[index] === 'X') return value;
          return this.mask[index];
        }).join('');
        // convert string back to decimal
        let value = parseInt(string, 2);
        this.memory.set(address, value);
      }
    })
  }

  getSum() {
    let result = 0;
    this.memory.forEach(v => {
      result += v;
    })
    return result;
  }
}

let p = new Program(lines);
p.run();
console.log(p.getSum())

// part 2

function combinations(n) {
  const max = 2**n;
  const result = [];
  for(let i = 0; i < max; i++) {
    result.push(i.toString(2).padStart(n, '0'));
  }
  return result;
}

class Program2 {
  constructor(input) {
    this.code = input;
    this.memory = new Map();
  }

  run() {
    this.code.forEach(line => {
      if (/^mask/.test(line)) {
        const {groups} = /^mask = (?<mask>.*)$/.exec(line);
        this.mask = [...groups.mask];
        this.combinations = combinations(this.mask.filter(x => x === 'X').length);
      } else {
        const {groups} = /^mem\[(?<address>\d+)\] = (?<decimal>\d+)$/.exec(line);
        let address = parseInt(groups.address);
        let binaryAddress = [...address.toString(2).padStart(36, '0')];
        let decimal = parseInt(groups.decimal);
        this.combinations.forEach(combination => {
          let xPosition = 0;
          let newAddress = this.mask.map((v, i) => {
            if (v === 'X') return combination[xPosition++];
            return parseInt(v) | parseInt(binaryAddress[i]);
          }).join('');
          this.memory.set(parseInt(newAddress, 2), decimal);
        })
      }
    })
  }

  getSum() {
    let result = 0;
    this.memory.forEach(v => {
      result += v;
    })
    return result;
  }
}

let p2 = new Program2(lines);
p2.run();
console.log(p2.getSum())