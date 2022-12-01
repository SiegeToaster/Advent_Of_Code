const fs = require('fs');

const raw = fs.readFileSync("2022/day1/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let elves = [0];
let currentElf = 0;

for (const instruction of instructions) {
	if (instruction == '') {
		currentElf++;
		elves[currentElf] = 0
	} else {
		elves[currentElf] = elves[currentElf] + parseInt(instruction);
	}
}

elves.sort((a, b) => {
	return b - a;
});

console.log(elves[0]);
