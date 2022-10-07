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

	const side1 = current[0] * current[1];
	const side2 = current[1] * current[2];
	const side3 = current[2] * current[0];
	const total = 2 * (side1 + side2 + side3);
	const sidesArr = [side1, side2, side3].sort((a,b) => a - b);
	allTotal += total + sidesArr[0];
}

console.log(allTotal);
