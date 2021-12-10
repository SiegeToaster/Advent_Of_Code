console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day10/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
const openChars = ['(', '[', '{', '<'];
const closeChars = [')', ']', '}', '>'];
const valueMap = new Map([[')', 1], [']', 2], ['}', 3], ['>', 4]]);
let outstandingChars;
let correctionPointsArr = new Array();
let totalUhOhValue = 0;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split('');
}

// console.log(input);

for (let i = 0; i < input.length; i++) {
	outstandingChars = new Array();
	let uhOhChar;

	input[i].forEach(character => {
		if (uhOhChar !== undefined) return;
		// console.log('\n')
		if (openChars.includes(character)) return outstandingChars.push(character);
		if (closeChars.includes(character)) {
			// console.log(outstandingChars);
			if (closeCharToOpenChar(character) == outstandingChars[outstandingChars.length - 1]) {
				outstandingChars.pop();
			} else {
				// console.log(`Expected ${OpenCharToCloseChar(outstandingChars[outstandingChars.length - 1])}, but found ${character}`);
				uhOhChar = character;
				outstandingChars = new Array();
			}
		}
		// console.log(character);
	})

	// console.log(outstandingChars);
	if (outstandingChars.length > 0) {
		let correctionValue = 0
		for (let j = outstandingChars.length - 1; j > -1; j--) {
			correctionValue *= 5;
			// console.log(outstandingChars[j], valueMap.get(OpenCharToCloseChar(outstandingChars[j])));
			correctionValue += valueMap.get(OpenCharToCloseChar(outstandingChars[j]));
		}
		correctionPointsArr.push(correctionValue);
	}
	// console.log('\n');
}

correctionPointsArr = correctionPointsArr.sort((a, b) => a - b);
totalUhOhValue = correctionPointsArr[(correctionPointsArr.length - 1) / 2]

// console.log(correctionPointsArr);
console.log(totalUhOhValue);
console.timeEnd();

function closeCharToOpenChar(char) {
	return openChars[closeChars.indexOf(char)];
}

function OpenCharToCloseChar(char) {
	return closeChars[openChars.indexOf(char)];
}