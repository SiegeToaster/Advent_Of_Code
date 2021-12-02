const fs = require('fs');

const raw = fs.readFileSync("day1/part1/input.txt", "utf-8");
let numberArr = raw.split('\r');
let windowArr = [];
let count = 0;

for (let i = 0; i < numberArr.length; i++) {
	numberArr[i] = parseInt(numberArr[i]);
}

for (let i = 0; i < numberArr.length - 2; i++) {
	if (numberArr[i + 2] == undefined) return console.error('wtf');
	const windowNum = numberArr[i] + numberArr[i + 1] + numberArr [i + 2];
	windowArr.push(windowNum);
}

for (let i = 0; i < windowArr.length; i++) {
	const num1 = windowArr[i];
	const num2 = windowArr[i + 1];
	if (num2 > num1) count++;
}

console.log(count);