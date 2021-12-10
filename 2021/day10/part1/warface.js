console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day10/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
const openChars = ['(', '[', '{', '<'];
const closeChars = [')', ']', '}', '>'];
const valueMap = new Map([[')', 3], [']', 57], ['}', 1197], ['>', 25137]]);
let outstandingChars;
let errorChars = new Array();
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
			}
		}
		// console.log(character);
	})
	if (uhOhChar !== undefined) errorChars.push(uhOhChar);
	// console.log(outstandingChars);
}

// console.log(errorChars);
for (let i = 0; i < errorChars.length; i++) {
	totalUhOhValue += valueMap.get(errorChars[i]);
}

console.log(totalUhOhValue);

function closeCharToOpenChar(char) {
	return openChars[closeChars.indexOf(char)];
}

function OpenCharToCloseChar(char) {
	return closeChars[openChars.indexOf(char)];
}