console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day9/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let lowPoints = [];
let lowPointsSum = 0;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split('');
}

for (let i = 0; i < input.length; i++) {
	for (let k = 0; k < input[i].length; k++) {
		input[i][k] = parseInt(input[i][k]);
	}
}

// console.log(input);

for (let i = 0; i < input.length; i++) {
	for (let k = 0; k < input[i].length; k++) {
		const topValue = i - 1 >= 0 ? input[i - 1][k] : 9;
		const rightValue = k + 1 < input[i].length ? input[i][k + 1] : 9;
		const bottomValue = i + 1 < input.length ? input[i + 1][k] : 9;
		const leftValue = k - 1 >= 0 ? input[i][k - 1] : 9;
		// 9 if undefined so that is is always higher, won't affect low points
		let valueArr = [topValue, rightValue, bottomValue, leftValue];

		const value = input[i][k];
		if (!valueArr.includes(value)) {
			valueArr = valueArr.filter(num => num < value); // if num is same it gets filtered out
			if (valueArr.length === 0 && !valueArr.includes(value)) lowPoints.push(value + 1);
		}
	}
}

for (let point of lowPoints) {
	lowPointsSum += point;
}

console.log(lowPointsSum);
console.timeEnd()