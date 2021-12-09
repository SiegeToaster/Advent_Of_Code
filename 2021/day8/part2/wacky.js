console.time();
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
	let dValue = findDValue(i, []);
	let bValue = findBValue(i, dValue);
	let fValue = findFValue(i);
	let gValue = findGValue(i, aValue, dValue, []);
	let eValue = findEValue(i, aValue, gValue);
	let cValue = findCValue(i, fValue);

	uniqueWhateverNumbers.set(alphebetize([aValue, bValue, cValue, eValue, fValue, gValue].join('')), 0);
	uniqueWhateverNumbers.set(alphebetize([cValue, fValue].join('')), 1);
	uniqueWhateverNumbers.set(alphebetize([aValue, cValue, dValue, eValue, gValue].join('')), 2);
	uniqueWhateverNumbers.set(alphebetize([aValue, cValue, dValue, fValue, gValue].join('')), 3);
	uniqueWhateverNumbers.set(alphebetize([bValue, cValue, dValue, fValue].join('')), 4);
	uniqueWhateverNumbers.set(alphebetize([aValue, bValue, dValue, fValue, gValue].join('')), 5);
	uniqueWhateverNumbers.set(alphebetize([aValue, bValue, dValue, eValue, fValue, gValue].join('')), 6);
	uniqueWhateverNumbers.set(alphebetize([aValue, cValue, fValue].join('')), 7);
	uniqueWhateverNumbers.set(alphebetize([aValue, bValue, cValue, dValue, eValue, fValue, gValue].join('')), 8);
	uniqueWhateverNumbers.set(alphebetize([aValue, bValue, cValue, dValue, fValue, gValue].join('')), 9);

	input[i][0] = uniqueWhateverNumbers;
} // format [unit signal patterns(map), four digit output value[4]]


for (let i = 0; i < input.length; i++) {
	let outputValue = '';

	for (let wtfIsGoinOn = 0; wtfIsGoinOn < 4; wtfIsGoinOn++) {
		if (input[i][1][wtfIsGoinOn].length === 2 || input[i][1][wtfIsGoinOn].length === 3 || input[i][1][wtfIsGoinOn].length === 4 || input[i][1][wtfIsGoinOn].length === 7) {
			// console.log(`${alphebetize(input[i][1][wtfIsGoinOn])}: ${wackyDigits.get(input[i][1][wtfIsGoinOn].length)}`);
			outputValue += wackyDigits.get(input[i][1][wtfIsGoinOn].length);
		} else {
			// console.log(`${alphebetize(input[i][1][wtfIsGoinOn])}: ${input[i][0].get(alphebetize(input[i][1][wtfIsGoinOn]))}`);
			outputValue += input[i][0].get(alphebetize(input[i][1][wtfIsGoinOn]));
		}
		// console.log('\n')
	}
	// console.log(outputValue);
	totalWackyDigits += parseInt(outputValue);
}

console.log(totalWackyDigits);
console.timeEnd();

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

function findBValue(i, dValue, previousValue) {
	let bValue = previousValue;

	for (let value of input[i][0]) {
		if (bValue === undefined && value.length === 4) bValue = value.split('');
		if (bValue !== undefined) {
			if (value.length === 2) {
				bValue = bValue.filter(letter => !value.split('').includes(letter));
				bValue = bValue.filter(letter => !dValue.split('').includes(letter));
			}
		}
	}

	if (bValue.length !== 1) return findBValue(i, dValue, bValue);
	return bValue.join('');
}

function findCValue(i, fValue, oneValue) {

	for (let value of input[i][0]) {
		if (oneValue === undefined && value.length === 2) {
			return findCValue(i, fValue, value.split(''));
		}
		if (oneValue !== undefined) {
			return oneValue.filter(letter => !fValue.split('').includes(letter)).join('');
		}
	}
	
}

function findDValue(i, previousUsedValues, previousValue) {
	let dValue = previousValue;
	let usedValues = previousUsedValues;

	for (let value of input[i][0]) {
		if (dValue !== undefined && dValue.length === 1) return dValue.join('');
		if (!usedValues.includes(value)) {
			if (dValue !== undefined && dValue.length === 3) {
				if (value.length === 4) {
					usedValues.push(value);
					dValue = dValue.filter(letter => value.split('').includes(letter));
				}
			} else {
				if (value.length === 5) {
					usedValues.push(value);
					if (dValue === undefined) {
						dValue = value.split('');
					} else {
						dValue = dValue.filter(letter => value.split('').includes(letter));
					}
				}
			}
		}
	}

	if (dValue.length !== 1) return findDValue(i, usedValues, dValue);
	return dValue.join('');
}

function findEValue(i, aValue, gValue, previousValue) {
	let eValue = previousValue;

	for (let value of input[i][0]) {
		if (eValue === undefined && value.length === 7) eValue = value.split('');
		if (eValue !== undefined && value.length === 4) {
			eValue = eValue.filter(letter => !value.split('').includes(letter));
			eValue = eValue.filter(letter => !aValue.split('').includes(letter));
			eValue = eValue.filter(letter => !gValue.split('').includes(letter));
		}
	}

	if (eValue.length !== 1) return findEValue(i, aValue, gValue, eValue);
	return eValue.join('');
}

function findFValue(i, oneValue, previousValue) {
	for (let value of input[i][0]) {
		if (oneValue === undefined && value.length === 2) {
			return findFValue(i, value.split(''));
		}
		if (oneValue !== undefined) {
			if (value.length === 6) {
				const findSix = value.split('').filter(letter => !oneValue.includes(letter));
				if (findSix.length === 5) {
					return value.split('').filter(letter => oneValue.includes(letter)).join('');
					
				}
			}
		}
	}
}

function findGValue(i, aValue, dValue, previousUsedValues, previousValue) {
	let gValue = previousValue;
	let usedValues = previousUsedValues;

	for (let value of input[i][0]) {
		if (gValue !== undefined && gValue.length === 1) return gValue.join('');
		if (!usedValues.includes(value)) {
			if (gValue !== undefined && gValue.length === 3) {
				gValue = gValue.filter(letter => ![aValue, dValue].includes(letter));
			} else {
				if (value.length === 5) {
					usedValues.push(value);
					if (gValue === undefined) {
						gValue = value.split('');
					} else {
						gValue = gValue.filter(letter => value.split('').includes(letter));
					}
				}
			}
		}
	}
	
	if (gValue.length !== 1) return findGValue(i, aValue, dValue, usedValues, gValue);
	return gValue.join('');
}