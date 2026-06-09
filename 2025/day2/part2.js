const fs = require('fs');

const raw = fs.readFileSync("2025/day2/input.txt", "utf-8");
let instructions = raw.split('\r\n')[0].split(',');

sum = 0;

for (i in instructions) {
  instructions[i] = instructions[i].split('-')
  instructions[i][0] = parseInt(instructions[i][0])
  instructions[i][1] = parseInt(instructions[i][1])
  // console.log(instructions)

  for (j = instructions[i][0]; j <= instructions[i][1]; j++) {
    text = j.toString()
    for (k = 1; k <= text.length/2; k++) {
      if (text.length % k != 0) continue;
      let chunks = [];
      for (l=0; l < text.length; l += k) {
        chunks.push(text.slice(l, l + k))
      }

      const uniques = [...new Set(chunks)];
      if (uniques.length == 1) {
        sum += j
        break;
      }
    }
  }
}

console.log(sum)