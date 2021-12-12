console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day9/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let basilArray = new Array();
let lowPoints = new Array();
let basilLenghtArray = new Array();
let result = 0;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split('');
}

for (let i = 0; i < input.length; i++) {
	for (let k = 0; k < input[i].length; k++) {
		input[i][k] = parseInt(input[i][k]);
	}
}

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
			if (valueArr.length === 0) lowPoints.push([i, k]); // i = y; k = x;
		}
	}
}

// console.log(lowPoints.length);
for (let i = 0; i < lowPoints.length; i++) {
	basilArray.push([]); // start an array for each basil leaf
}

// console.log(basilArray);
// console.log(lowPoints);

for (let i = 0; i < basilArray.length; i++) {
	addPoint(lowPoints[i], i);
}

for (let i = 0; i < basilArray.length; i++) {
	basilLenghtArray.push(basilArray[i].length);
}
basilLenghtArray.sort((a, b) => b - a);
for (let i = 0; i < 3; i++) {
	if (result === 0) {
		result = basilLenghtArray[i];
	} else {
		result *= basilLenghtArray[i];
	}
}

// console.log(basilLenghtArray);
console.log(result);
console.timeEnd();

function addPoint(point, index) { // point is Arr[yValue, xValue]
	const xValue = point[1];
	const yValue = point[0];
	// console.log(`\nCheck: ${xValue}, ${yValue}`);
	
	if (JSON.stringify(basilArray[index]).indexOf(JSON.stringify(point)) !== -1) return;

	basilArray[index].push(point);
	if (yValue - 1 > -1 && input[yValue - 1][xValue] !== 9) { // up
		// console.log(`aw yep 1: ${[yValue - 1, xValue]} - ${input[yValue - 1][xValue]}`);
		addPoint([yValue - 1, xValue], index);
	}
	if (xValue + 1 < input[0].length && input[yValue][xValue + 1] !== 9) { // right
		// console.log(`aw yep 2: ${[yValue, xValue + 1]} - ${input[yValue][xValue + 1]}`);
		addPoint([yValue, xValue + 1], index);
	}
	if (yValue + 1 < input.length && input[yValue + 1][xValue] !== 9) { // down
		// console.log(`aw yep 3: ${[yValue + 1, xValue]} - ${input[yValue + 1][xValue]}`);
		addPoint([yValue + 1, xValue], index);
	}
	if (xValue - 1 > -1 && input[yValue][xValue - 1] !== 9) { // left
		// console.log(`aw yep 4: ${[yValue, xValue - 1]} - ${input[yValue][xValue - 1]}`);
		addPoint([yValue, xValue - 1], index);
	}
}
 