const fs = require('fs');

const raw = fs.readFileSync("2015/day2/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let allTotal = 0;

for (let i = 0; i < instructions.length; i++) {
	let current = instructions[i]
	current = current.split('x');
	for (let i = 0; i < current.length; i++) {
		current[i] = parseInt(current[i]);
	}

	current.sort((a, b) => a - b);
	const wrapLen = (2 * current[0]) + (2 * current[1]);
	const volume = current[0] * current[1] * current[2];
	allTotal += wrapLen + volume;
}

console.log(allTotal);
