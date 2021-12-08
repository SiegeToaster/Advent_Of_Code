/* Notes
Lengthi:
	0: 6
	1: 2 *
	2: 5
	3: 5
	4: 4 *
	5: 5
	6: 6
	7: 3 *
	8: 7 *
	9: 6
*/

const fs = require('fs');

const raw = fs.readFileSync("2021/day8/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let totalWackyDigits = 0;

const wackyDigits = new Map();
wackyDigits.set(2, 1);
wackyDigits.set(4, 4);
wackyDigits.set(3, 7);
wackyDigits.set(7, 8);

for (let i = 0; i < input.length; i++) {
	const uniqueWhateverNumbers = new Map();
	input[i] = input[i].split(' | ');
	input[i][0] = input[i][0].split(' ')
	input[i][1] = input[i][1].split(' ');
	for (let k = 0; k < 10; k++) {
		input[i][0][k] = alphebetize(input[i][0][k]);
	} // unit signal pattern[10]
	for (let k = 0; k < 4; k++) {
		input[i][1][k] = alphebetize(input[i][1][k]);
	} // unit signal pattern[4]

	let aValue = findAValue(i);
	let dValue = findDValue(i);
	console.log(`A: ${aValue}`);
	console.log(`D: ${dValue}`);


} // format [unit signal patterns(map), four digit output value[4]]
return;
console.log(input);



for (let i = 0; i < input.length; i++) {
	const uniqueWhateverNumbers = new Map();
	for (let uniqueBS = 0; uniqueBS < 10; uniqueBS++) {
		const alphebetizedString = alphebetize(input[i][0][uniqueBS]);
		let stringValue;
		if (alphebetizedString.length === 2 || alphebetizedString.length === 3 || alphebetizedString.length === 4 || alphebetizedString.length === 7) { // if it's a unique length digit
			stringValue = wackyDigits.get(alphebetizedString.length);
		} else {
			switch (alphebetizedString) {
				case 'abcdeg': stringValue = 0; break;
				case 'acdfg': stringValue = 2; break;
				case 'abcdf': stringValue = 3; break;
				case 'bcdef': stringValue = 5; break;
				case 'bcdefg': stringValue = 6; break;
				case 'abcdef': stringValue = 9; break;
			}
		}
		uniqueWhateverNumbers.set(alphebetizedString, stringValue)
	}
	input[i][0] = uniqueWhateverNumbers;
	console.log(input[i][0])

	for (let wtfIsGoinOn = 0; wtfIsGoinOn < 4; wtfIsGoinOn++) {
		if (input[i][1][wtfIsGoinOn].length === 2 || input[i][1][wtfIsGoinOn].length === 3 || input[i][1][wtfIsGoinOn].length === 4 || input[i][1][wtfIsGoinOn].length === 7) {
			console.log(`${alphebetize(input[i][1][wtfIsGoinOn])}: ${wackyDigits.get(input[i][1][wtfIsGoinOn].length)}`);
		} else {
			console.log(`${alphebetize(input[i][1][wtfIsGoinOn])}: ${input[i][0].get(alphebetize(input[i][1][wtfIsGoinOn]))}`);
		}
		console.log('\n')
	}
}

console.log(totalWackyDigits);

function alphebetize(string) { // spelling is for nerds
	return string.split('').sort().join('');
}

function findAValue(i, previousValue) {
	let aValue = previousValue;
	for (let value of input[i][0]) {
		if (value.length === 2 || value.length === 3) {
			if (value.length === 3 && aValue === undefined) aValue = value.split('');
			if (value.length === 2) {
				if (aValue !== undefined) aValue = aValue.filter(letter => !value.split('').includes(letter));
			}
		}
	}
	if (aValue.length !== 1) return findAValue(i, aValue);
	return aValue.join('');
}

function findDValue(i, previousValue) {
	let dValue = previousValue;
	console.log(dValue);
	for (let value of input[i][0]) {
		if (dValue !== undefined && dValue.length === 3) {
			if (value.length === 4) dValue = dValue.filter(letter => !value.split('').includes(letter));
		} else {
			if (value.length === 5) {
				if (dValue === undefined) {
					dValue = value.split('');
				} else {
					dValue = dValue.filter(letter => !value.split('').includes(letter));
				}
			}
		}
	}
	if (dValue.length !== 1) return findDValue(i, dValue);
	return dValue.join('');
}