const fs = require('fs');

const raw = fs.readFileSync("2015/day1/input.txt", "utf-8");
const instructions = raw.split('');

let floor = 0;

for (let i = 0; i < instructions.length; i++) {
	if (instructions[i] === '(') {
		floor += 1;
	} else {
		floor -= 1;
	}

	if (floor < 0) {
		console.log(i + 1);
		console.log(floor);
		break;
	}
}
