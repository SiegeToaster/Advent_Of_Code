const fs = require('fs');

const raw = fs.readFileSync("2025/day3/input.txt", "utf-8");
let instructions = raw.split('\r\n');

sum = 0;

for (i in instructions) {
  bank = instructions[i].split('')
  max = 0;
  for (j = 0; j < bank.length; j++) {
    first = bank[j];
    for (k = j + 1; k < bank.length; k++) {
      second = bank[k];
      if (parseInt(`${first}${second}`) > max) max = parseInt(`${first}${second}`)
    }
  }
  // console.log(max)
  sum += max
}

console.log(sum)