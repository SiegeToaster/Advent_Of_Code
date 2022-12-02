const fs = require('fs');

const raw = fs.readFileSync("2022/day2/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let totalScore = 0;

for (let i in instructions) {
	let score = 0;
	instructions[i] = instructions[i].split(' ');
	switch (instructions[i][1]) {
		case 'X':
			score += 1;
			break;
	
		case 'Y':
			score += 2;
			break;
		
		case 'Z':
			score += 3;
			break;
		
		default:
			console.log('WEE WOOO');
			break;
	}
	
	if (
		(instructions[i][0] == 'A' && instructions[i][1] == 'X') ||
		(instructions[i][0] == 'B' && instructions[i][1] == 'Y') ||
		(instructions[i][0] == 'C' && instructions[i][1] == 'Z')
	) {
		totalScore += score + 3;
		continue;
	}

	if (instructions[i][0] == 'A') {
		if (instructions[i][1] == 'Y') {
			totalScore += score + 6;
		} else {
			totalScore += score;
		}
	} else if (instructions[i][0] == 'B') {
		if (instructions[i][1] == 'Z') {
			totalScore += score + 6;
		} else {
			totalScore += score;
		}
	} else {
		if (instructions[i][1] == 'X') {
			totalScore += score + 6;
		} else {
			totalScore += score;
		}
	}
}

console.log(totalScore); // too low - 12587
