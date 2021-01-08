const fs = require('fs')
const groups = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n\n')

let total = 0
let total2 = 0

for (const group of groups) {
  const uniques = new Set([...group.replace(/\n/g, '')]);
  total += uniques.size;

  total2 += [...uniques].filter(char => group.split('\n').every(form => form.includes(char))).length;
}

console.log(total, total2)