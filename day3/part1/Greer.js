const fs = require('fs');

const raw = fs.readFileSync("day3/part1/input.txt", "utf-8");
let binaryArr = raw.split('\n');
let gammaRate = '';
let epsilonRate = '';

for (let u = 0; u < 12; u++) { // 12 is length of each value
	let zeroes = 0;
	let ones = 0;
	for (let xylophone = 0; xylophone < binaryArr.length; xylophone++) {
		if (binaryArr[xylophone][u] == '0') {
			zeroes++;
		} else {
			ones++;
		}
	}
	if (zeroes > ones) {
		gammaRate += '0';
		epsilonRate += '1';
	} else {
		gammaRate += '1';
		epsilonRate += '0';
	}
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.log(gammaRate * epsilonRate);
