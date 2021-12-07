const fs = require('fs');

const raw = fs.readFileSync("2021/day7/part1/input.txt", "utf-8");
const input = raw.split(',');
const fuelArr = new Array();

for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i]);
}
const maxNumber = Math.max(...input);

for (let i = 0; i <= maxNumber; i++) {
	for (let num of input) { // let num = 0; num < input.length; num++
		const distance = Math.abs(num - i);
		if (fuelArr[i] == undefined) {
			fuelArr[i] = distance
		} else {
			fuelArr[i] += distance
		}
	}
}

console.log(Math.min(...fuelArr));