/*
	P.O.S. doesn't work
*/

console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day9/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let basilArray = new Array();
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
		const value = input[i][k];
		if (value === 9) continue;
		// console.log('\n');
		// console.log([i, k], input[i][k]);
		addPoint([i, k]);

		// search left and up until a 9 is found
	}
	// console.log(basilArray);
}

console.log(basilArray);
console.log(basilArray.length);

let changesMade = true;

while (changesMade) {
	changesMade = false;
	for (let i = 0; i < basilArray.length; i++) {
		if (basilArray[i].length == 1) {
			addPoint(basilArray[i][0]);
			basilArray.splice(i, 1)
			i--;
			changesMade = true;
		}
	}
}

for (let i = 0; i < basilArray.length; i++) {
	basilLenghtArray.push(basilArray[i].length);
}
basilLenghtArray.sort((a, b) => b - a)
console.log(basilLenghtArray);
while (basilLenghtArray.length > 3) {
	basilLenghtArray.pop();
}

console.log(basilArray);
console.log(basilArray.length);

for (let i = 0; i < 3; i++) {
	if (result === 0) {
		result = basilLenghtArray[i];
	} else {
		result *= basilLenghtArray[i];
	}
}


console.log('\n\n\nResult: ')
// console.log(basilArray);
console.log(result);

console.timeEnd();
// 692640 too low
// 3650400 too high

function addPoint(point) {
	let pointAdded = false;
	const xPoint = point[0];
	const yPoint = point[1];
	for (let i = 0; i < basilArray.length; i++) {
		// console.log('\n');
		// console.log(basilArray[i])
		// console.log(point)
		if (basilArray[i].includes(`${point}`)) {
			pointAdded = true;
			break;
		}
		if (basilArray[i].includes(`${[xPoint - 1, yPoint]}`) || basilArray[i].includes(`${[xPoint + 1, yPoint]}`) || basilArray[i].includes(`${[xPoint, yPoint - 1]}`) || basilArray[i].includes(`${[xPoint, yPoint + 1]}`)) {
			// console.log(point)
			// console.log(basilArray[i]);
			basilArray[i].push(`${point}`);
			pointAdded = true;
			break;
		}
	}

	if (!pointAdded) {
		// console.log(point);
		basilArray.push([`${point}`])
	}
}