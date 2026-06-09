const fs = require('fs');

const raw = fs.readFileSync("2025/day2/input.txt", "utf-8");
let instructions = raw.split('\r\n')[0].split(',');

sum = 0;

for (i in instructions) {
  instructions[i] = instructions[i].split('-')
  instructions[i][0] = parseInt(instructions[i][0])
  instructions[i][1] = parseInt(instructions[i][1])

  for (j = instructions[i][0]; j <= instructions[i][1]; j++) {
    text = j.toString()
    if (text.length % 2 == 1) continue
    first = text.slice(0,text.length/2)
    second = text.slice(text.length/2)

    if (first == second) sum += j;
  }
}

console.log(sum)