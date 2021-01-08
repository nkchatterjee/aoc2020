const fs = require('fs')
const lines = [0].concat(fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n').map(x => parseInt(x))).sort((a, b) => a - b)

let lastElement = lines.slice(-1)[0]
lines.push(lastElement + 3);

// part 1
let difference1 = 0;
let difference3 = 0;

for (let i = 1; i < lines.length; i++) {
  const diff = lines[i] - lines[i - 1];
  if (diff === 1) difference1++;
  if (diff === 3) difference3++;
}

console.log(difference1 * difference3)

// part 2
function combination(array, memo = {}) {
  const key = array.join`,`;
  if (key in memo) {
    return memo[key];
  }
  // the current combination counts
  let result = 1;
  for (let i = 1; i < array.length - 1; i++) {
    if (array[i + 1] - array[i - 1] <= 3) {
      const combo = [array[i - 1]].concat(array.slice(i + 1))
      result += combination(combo, memo);
    }
  }

  memo[key] = result;
  return result;
}

console.log(combination(lines));

// // part 2 using main()
// const fs = require('fs').promises;
// const path = require('path');

// const main = async () => {
//   const input = await fs.readFile(path.join(__dirname, 'input.txt'), 'utf-8');
//   let lines = input.split('\n').map((x) => parseInt(x));
//   const cache = {};

//   lines.push(0, Math.max(...lines) + 3);
//   lines = lines.sort((a, b) => a - b);

//   const dp = (n) => {
//     if (n === lines.length - 1) {
//       return 1;
//     }
//     if (n in cache) {
//       return cache[n];
//     }
//     let ans = 0;
//     for (let i = n + 1; i < lines.length; i++) {
//       if (lines[i] - lines[n] <= 3) {
//         ans += dp(i);
//       }
//     }
//     cache[n] = ans;
//     return ans;
//   };

//   console.log(dp(0));
// };

// main();