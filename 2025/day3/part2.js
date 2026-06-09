const fs = require('fs');
const { posix } = require('path');

const raw = fs.readFileSync("2025/day3/input.txt", "utf-8");
let instructions = raw.split('\r\n');

sum = 0;

for (i in instructions) {
  bank = instructions[i].split('')
  positions = Array.from({ length: 12 }, (_, i) => i);
  turnedOn = []
  turnedOn[0] = bank[positions[0]]

  for (let i = 0; i < bank.length - positions.length + 1; i++) {
    if (parseInt(bank[i]) > parseInt(bank[positions[0]])) {
      positions[0] = i
      turnedOn[0] = bank[positions[0]]
    }
  }

  for (let digit = 1; digit < positions.length; digit++) {
    positions[digit] = positions[digit - 1] + 1;
    turnedOn[digit] = bank[positions[digit]]
    for (let i = positions[digit] + 1; i < bank.length - positions.length + digit + 1; i++) {
      // console.log(`for digit ${digit} - ${i}: ${bank[i]}`)
      if (parseInt(bank[i]) > parseInt(bank[positions[digit]])) {
        positions[digit] = i
        turnedOn[digit] = bank[positions[digit]]
      }
    }
  }

  max = parseInt(turnedOn.join(''))  
  // console.log(positions)
  // console.log()
  // console.log(max)
  sum += max
}

console.log(sum)