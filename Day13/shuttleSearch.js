const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

const time = parseInt(lines[0])
const buses = lines[1].split(',')

// part 1

const list = [];
buses.forEach(bus => {
  if (bus === 'x') return;
  const id = parseInt(bus);
  list.push({
    bus: id,
    nextOne: id - time % bus
  })
})
list.sort((a, b) => a.nextOne - b.nextOne);

console.log(list[0].nextOne * list[0].bus);

// part 2

const timestamps = [];
buses.forEach((bus, index) => {
  if (bus != 'x') timestamps.push({bus: parseInt(bus), delta: index})
})

let step = timestamps[0].bus;
let t = step;

for (let i = 1; i < timestamps.length; i++) {
  while((t + timestamps[i].delta) % timestamps[i].bus !== 0) {
    t += step;
  }
  step *= timestamps[i].bus
}

console.log(t);