const fs = require('fs');

const raw = fs.readFileSync("day1/part1/input.txt", "utf-8");
let numberArr = raw.split('\r');
let count = 0;

for (let i = 0; i < numberArr.length; i++) {
	numberArr[i] = parseInt(numberArr[i]);
}

for (let i = 0; i < numberArr.length; i++) {
	const num1 = numberArr[i];
	const num2 = numberArr[i + 1];
	if (num2 > num1) count++;
}

console.log(count);