const fs = require('fs');

const raw = fs.readFileSync("2021/day3/part1/input.txt", "utf-8");
let binaryArr = raw.split('\n');
let oxGenRating = '';
let co2ScrubbadubwubRating = '';

oxGenRating = WTFAMIDOING(binaryArr, 'ox')
co2ScrubbadubwubRating = WTFAMIDOING(binaryArr, 'co2')
console.log(oxGenRating, co2ScrubbadubwubRating);

oxGenRating = parseInt(oxGenRating, 2);
co2ScrubbadubwubRating = parseInt(co2ScrubbadubwubRating, 2);

console.log(oxGenRating * co2ScrubbadubwubRating);


function WTFAMIDOING(arr, type) {

	for (let u = 0; u < 12; u++) { // 12 is length of each value
		if (arr.length == 1) return arr;
		let bitCroatia;
		let zeroes = 0;
		let ones = 0;
		
		// determine most common bit value
		for (let xylophone = 0; xylophone < arr.length; xylophone++) {
			if (arr[xylophone][u] == '0') {
				zeroes++;
			} else {
				ones++;
			}
		}

		if (type != 'ox') {
			if (zeroes > ones) {
				bitCroatia = '0';
			} else {
				bitCroatia = '1';
			}
		} else {
			if (ones >= zeroes) {
				bitCroatia = '0';
			} else {
				bitCroatia = '1';
			}
		}

		console.log(bitCroatia);
		arr = arr.filter(value => value[u] == bitCroatia);
	}
	return arr;
}