console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day13/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let points = new Set();
let instructions = new Array();
let pointsDone = false;

for (let entry of input) {
	if (entry === '') {
		pointsDone = true;
		continue;
	}

	if (pointsDone) {
		// add to instructions
		instructions.push(entry)
	} else {
		// add to points
		let point = entry.split(',')
		for (let i = 0; i < point.length; i++) {
			point[i] = parseInt(point[i]);
		}
		points.add(point);
	}
} // separate instructions from points

// console.log(points);
// console.log(instructions);


for (let instruction of instructions) {
	// console.log('\n');
	instruction = instruction.split('=');
	instruction[0] = instruction[0].slice(instruction[0].length - 1);
	instruction[1] = parseInt(instruction[1]);
	const value = instruction[1];
	const max = (2 * value);

	if (instruction[0] === 'y') {
		// console.log('y');
		for (let point of points) {
			if (point[1] <= value) continue;
			// console.log('\n');
			// console.log(point);
			const newPoint = [point[0], max - point[1]]; // flip y value
			// console.log(newPoint);

			points.delete(point);
			points.add(newPoint);
		}
		// console.log(points);
		// console.log(value);
		// console.log(max);
	} else {
		// console.log('x');
		for (let point of points) {
			if (point[0] <= value) continue;
			// console.log(point);
			const newPoint = [max - point[0], point[1]]; // flip x value
			// console.log(newPoint);
			// console.log('\n');
			points.delete(point);
			points.add(newPoint);
		}
		// console.log(value);
		// console.log(max);
	}
	// console.log(points);
} // process instructions


let newPoints = new Set();
// console.log(points.size);
for (let point of points.values()) {
	points.delete(point);
	newPoints.add(`${point}`) // sets don't see equal arrays as duplicates ig
} // filter overlapping points
// console.log(newPoints);


let xMax = 0;
let yMax = 0;
for (let i = instructions.length - 1; i > -1; i--) {
	if (xMax !== 0 && yMax !== 0) break;

	let instruction = instructions[i].split('=');
	instruction[0] = instruction[0].slice(instruction[0].length - 1);

	if (xMax === 0 && instruction[0] === 'x') xMax = parseInt(instruction[1]);
	if (yMax === 0 && instruction[0] === 'y') yMax = parseInt(instruction[1]);
} // find bounds for array


let displayString = '';
for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {
		const point = `${[x, y]}`;
		newPoints.has(point) ? displayString += '#' : displayString += '.'; // "Assignments should not be made from within sub-expressions (javascript:S1121)" ok, and?
	}
	displayString += '\n';
}


console.log(displayString);
console.timeEnd();