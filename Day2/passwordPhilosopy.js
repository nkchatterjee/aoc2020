const partOne = (low, high, letter, password) =>{
  let count = 0;
  for(char of password){
      if (char === letter){
          count += 1;
      }
  }
  return (count >= low && count <= high);
}

const partTwo = (low, high, letter, password) =>{
  return (password[low] === letter) ^ (password[high] === letter)
}

const fs = require('fs');
const data = fs.readFileSync('Problem-2/Day-2-Password-Philosophy.txt').toString().split("\n");
let out1 = 0, out2 = 0;
data.forEach((line)=>{
  let [freq, letter, password] = line.split(' ');
  let [low, high] = freq.split('-').map((val) => Number(val));
  letter = letter.slice(0, letter.length - 1);
  if (partOne(low, high, letter, password)){ out1++; }
  if (partTwo(low - 1, high - 1, letter, password)){ out2++; }    
})

console.log(out1, out2);