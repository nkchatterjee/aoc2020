const fs = require('fs');
const { stringify } = require('querystring');
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

function solve(input) {
  let tokens = input.split(' ');
  while (tokens.length > 1) {
    tokens = [eval(tokens.slice(0, 3).join(''))].concat(tokens.slice(3));
  }
  return tokens[0];
}

function solve2(input) {
  while (/\+/.test(input)) {
    input = input.replace(/(\d+) \+ (\d+)/g, (match, firstNumber, secondNumber) => {
      return parseInt(firstNumber) + parseInt(secondNumber);
    })
  }
  return eval(input);
}

function solveWithParens(input, solution) {
  while (/\(/.test(input)) {
    // solve expression in parens and return that number
    input = input.replace(/\(([^()]+)\)/g, (match, expression) => {
      return solution(expression);
    })
  }
  // if no parens, solve regularly
  return solution(input);
}

// part 1
let sum = 0;
lines.forEach(line => {
  sum += solveWithParens(line, solve);
})
console.log(sum);


// part 2
sum = 0;
lines.forEach(line => {
  sum += solveWithParens(line, solve2);
})
console.log(sum);