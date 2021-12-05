const fs = require('fs');

const raw = fs.readFileSync("day5/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let positions = new Map();
let numOfOverlaps = 0;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split(' -> ');
	input[i][0] = input[i][0].split(',');
	input[i][0][0] = parseInt(input[i][0][0]);
	input[i][0][1] = parseInt(input[i][0][1]);
	input[i][1] = input[i][1].split(',');
	input[i][1][0] = parseInt(input[i][1][0]);
	input[i][1][1] = parseInt(input[i][1][1]);
} // construct input; format [[[x1, y1], [x2, y2]], [...], ...]


for (let i = 0; i < input.length; i++) {
	if (input[i][0][0] == input[i][1][0] /*x is equal*/) {
		const iterateNumber = input[i][0][1] - input[i][1][1]; // y1 - y2; could be done w/o but I did it to start and no point changing
		const startNumber = iterateNumber > 0 ? input[i][1][1] : input[i][0][1];
		const endNumber = iterateNumber < 0 ? input[i][1][1] : input[i][0][1];
		for (let k = startNumber; k <= endNumber; k++) {
			positions.set(`${input[i][0][0]},${k}`, positions.get(`${input[i][0][0]},${k}`) == undefined ? 1 : positions.get(`${input[i][0][0]},${k}`) + 1);
		}
	} else if (input[i][0][1] == input[i][1][1] /*y is equal*/) {
		const iterateNumber = input[i][0][0] - input[i][1][0]; // x1 - x2; could be done w/o but I did it to start and no point changing
		const startNumber = iterateNumber > 0 ? input[i][1][0] : input[i][0][0];
		const endNumber = iterateNumber < 0 ? input[i][1][0] : input[i][0][0];
		for (let k = startNumber; k <= endNumber; k++) {
			positions.set(`${k},${input[i][0][1]}`, positions.get(`${k},${input[i][0][1]}`) == undefined ? 1 : positions.get(`${k},${input[i][0][1]}`) + 1);
		}
	} else /* diagonal... ah fuck */ {
		const iterateNumber = input[i][0][0] - input[i][1][0]; // x1 - x2 could be done w/o but I did it to start and no point changing; has to be the same here, if it weren't then a new line would be made
		const xStartNumber = iterateNumber > 0 ? input[i][1][0] : input[i][0][0];
		const xEndNumber = iterateNumber < 0 ? input[i][1][0] : input[i][0][0];
		const yStartNumber = xStartNumber == input[i][1][0] ? input[i][1][1] : input[i][0][1];
		const yEndNumber = xEndNumber == input[i][1][0] ? input[i][1][1] : input[i][0][1];

		// console.log(`xStart: ${xStartNumber}, xEnd: ${xEndNumber}\nyStart: ${yStartNumber}, yEnd: ${yEndNumber}`);
		let d = yStartNumber;
		for (let k = xStartNumber; k <= xEndNumber; k++) { // no need for 2nd iterator amount, x and y are going the same amount of distance
			positions.set(`${k},${d}`, positions.get(`${k},${d}`) == undefined ? 1 : positions.get(`${k},${d}`) + 1);
			if (yStartNumber > yEndNumber) {
				d--
			} else {
				d++
			}
		}
	}
}

let iterator = positions[Symbol.iterator]();

for (const value of iterator) {
	if (value[1] > 1) numOfOverlaps++;
}

console.log(numOfOverlaps);