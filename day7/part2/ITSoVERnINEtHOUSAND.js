const fs = require('fs');

const raw = fs.readFileSync("day7/part1/input.txt", "utf-8");
const input = raw.split(',');
const fuelArr = new Array();

for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i]);
}
const maxNumber = Math.max(...input);

for (let i = 0; i <= maxNumber; i++) {
	for (let num of input) { // let num = 0; num < input.length; num++
		const distance = Math.abs(num - i);
		let actualDistance = 0;
		for (let k = 0; k <= distance; k++) {
			actualDistance += k;
		}
		if (fuelArr[i] == undefined) {
			fuelArr[i] = actualDistance
		} else {
			fuelArr[i] += actualDistance
		}
	}
}

console.log(Math.min(...fuelArr));