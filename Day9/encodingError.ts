const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

const numbers = lines.map((line) => Number(line));
const invalidNumber = findInvalidNumber(numbers);

for (let size = 2; size < numbers.length; size++) {
  for (let start = 0; start <= numbers.length - size; start++) {
    const end = start + size;

    const window = numbers.slice(start, end);
    const sum = window.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );

    if (sum === invalidNumber) {
      const result = window.sort((a, b) => a - b);
      // the !, it's telling TypeScript, that these aren't undefined. We KNOW, that the result has a first and last item. However, TypeScript does not know this, so we'll help it a little.
      console.log(result.shift()! + result.pop()!);
    }
  }
}

function findInvalidNumber(numbers: number[]): number {
  // Use a variable for preamble size. This way, we don't use a "magic number".
  const PREAMBLE_SIZE = 25;

  for (let i = PREAMBLE_SIZE; i < numbers.length; i++) {
    const number = numbers[i];

    const preamble = numbers.slice(i - PREAMBLE_SIZE, i);

    const numberIsValid = preamble.some((first) => {
      return preamble.some((second) => {
        if (first === second) return false;
        return first + second === number;
      });
    });

    if (!numberIsValid) {
      return number;
    }
  }

  // Should never happen.
  throw new Error();
}