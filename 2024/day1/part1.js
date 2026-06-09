const fs = require('fs');

const raw = fs.readFileSync("2024/day1/input.txt", "utf-8");
const instructions = raw.split('\r\n');

first = [];
second = [];

for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i].split('   ');
    first[i] = parseInt(instruction[0]);
    second[i] = parseInt(instruction[1]);
}

first.sort();
second.sort();

total = 0;
for (let i = 0; i < first.length; i++) {
    total += Math.abs(first[i] - second[i])
}

console.log(total)