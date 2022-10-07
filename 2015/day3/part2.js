const fs = require('fs');

const raw = fs.readFileSync("2015/day3/input.txt", "utf-8");
const instructions = raw.split('');
let positionsSanta = new Map().set('0,0', 1);
let positionsRobot = new Map().set('0,0', 1);
let xPosSanta = 0;
let yPosSanta = 0;
let xPosRobot = 0;
let yPosRobot = 0;

for (let i = 0; i < instructions.length; i++) {	
	isSanta = i % 2 == 0;
	
	const instruction = instructions[i]
	switch (instruction) {
		case '>':
			if (isSanta) {
				xPosSanta += 1;
			} else {
				xPosRobot += 1;
			}
			break;
	
		case 'v':
			if (isSanta) {
				yPosSanta -= 1;
			} else {
				yPosRobot -= 1;
			}
			break;

		case '<':
			if (isSanta) {
				xPosSanta -= 1;
			} else {
				xPosRobot -= 1;
			}
			break;
		
		case '^':
			if (isSanta) {
				yPosSanta += 1;
			} else {
				yPosRobot += 1;
			}
			break;
	};

	let pastValue = 0;
	if (isSanta) {
		const key = [xPosSanta, yPosSanta].toString();
		if (positionsSanta.has(key)) {
			pastValue = positionsSanta.get(key);
		}
	
		positionsSanta.set(key, pastValue + 1);
	} else {
		const key = [xPosRobot, yPosRobot].toString();
		if (positionsRobot.has(key)) {
			pastValue = positionsRobot.get(key);
		}

		positionsRobot.set(key, pastValue + 1);
	}
}

const uniquePositions = [...new Set(Array.from(positionsSanta.keys()).concat(Array.from(positionsRobot.keys())))]
console.log(uniquePositions.length);
