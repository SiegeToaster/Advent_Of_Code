const fs = require('fs');

const raw = fs.readFileSync("2015/day3/input.txt", "utf-8");
const instructions = raw.split('');
let previousPositions = new Map();
let xPos = 0;
let yPos = 0;

for (let i = 0; i < instructions.length; i++) {
	let pastValue = 0;
	const key = [xPos, yPos].toString();
	console.log(key)
	if (previousPositions.has(key)) {
		pastValue = previousPositions.get(key);
	}

	previousPositions.set(key, pastValue + 1);
	
	const instruction = instructions[i]
	switch (instruction) {
		case '>':
			xPos += 1;
			break;
	
		case 'v':
			yPos -= 1;
			break;

		case '<':
			xPos -= 1;
			break;
		
		case '^':
			yPos += 1;
			break;
	};
}

let pastValue = 0;
const key = [xPos, yPos].toString();
if (previousPositions.has(key)) {
	pastValue = previousPositions.get(key);
}

previousPositions.set(key, pastValue + 1);

console.log(previousPositions.size);
