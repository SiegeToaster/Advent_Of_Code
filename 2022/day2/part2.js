const fs = require('fs');

const raw = fs.readFileSync("2022/day2/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let totalScore = 0;

for (let i in instructions) {
	let score = 0;
	instructions[i] = instructions[i].split(' ');
	switch (instructions[i][1]) {	
		case 'Y':
			score += 3;
			break;
		
		case 'Z':
			score += 6;
			break;
	}

	if (instructions[i][0] == 'A') {
		if (instructions[i][1] == 'X') {
			totalScore += score + 3;
		} else if (instructions[i][1] == 'Y') {
			totalScore += score + 1;
		} else {
			totalScore += score + 2;
		}
	} else if (instructions[i][0] == 'B') {
		if (instructions[i][1] == 'X') {
			totalScore += score + 1;
		} else if (instructions[i][1] == 'Y') {
			totalScore += score + 2;
		} else {
			totalScore += score + 3;
		}
	} else {
		if (instructions[i][1] == 'X') {
			totalScore += score + 2;
		} else if (instructions[i][1] == 'Y') {
			totalScore += score + 3;
		} else {
			totalScore += score + 1;
		}
	}
}

console.log(totalScore);
