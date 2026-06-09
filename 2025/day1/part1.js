const fs = require('fs');

const raw = fs.readFileSync("2025/day1/input.txt", "utf-8");
const instructions = raw.split('\r\n');
position = 50;
code = 0;

for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    let turnRight = true;
    if (instruction.startsWith('L')) {
      instruction = instruction.slice(1)
      instruction = parseInt(instruction)
      turnRight = false;
    } else {
      instruction = instruction.slice(1)
      instruction = parseInt(instruction)
    }

    for (let j = 0; j < instruction; j++) {
      if (turnRight) {
        position++
      } else{
        position--
      }

      if (position > 99) position = 0
      if (position < 0) position = 99

    }
  if (position == 0) code++;
}

console.log()
console.log(code)