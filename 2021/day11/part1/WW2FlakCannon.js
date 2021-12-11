console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day11/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let totalFlashes = 0;
let todaysNewsFlash;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split('');
}

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		input[i][j] = parseInt(input[i][j]);
	}
}

for (let step = 0; step < 100; step++) {
	todaysNewsFlash = new Array();

	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			input[i][j]++;

			if (input[i][j] > 9 && !todaysNewsFlash.includes(`${[i, j]}`)) {
				newsFlash(i, j);
			}
		}
	}

	todaysNewsFlash.forEach(point => {
		point = point.split(',');
		point[0] = parseInt(point[0]);
		point[1] = parseInt(point[1]);

		input[point[0]][point[1]] = 0;
	});
}

// console.log(input);
console.log(totalFlashes);

console.timeEnd()


function newsFlash(i, j) {
	// console.log(i, j);
	// console.log(input[i][j]);
	input[i][j] = 0;
	totalFlashes++;
	todaysNewsFlash.push(`${[i, j]}`)

	if (i + 1 < 10 && !todaysNewsFlash.includes(`${[i + 1, j]}`)) {
		input[i + 1][j] += 1;
		if (input[i + 1][j] > 9) {
			// console.log('mrk_1')
			newsFlash(i + 1, j)
		}
	}
	if (i - 1 > -1 && !todaysNewsFlash.includes(`${[i - 1, j]}`)) {
		input[i - 1][j] += 1;
		if (input[i - 1][j] > 9) {
			// console.log('mrk_2')
			newsFlash(i - 1, j)
		}
	}
	if (j + 1 < 10 && !todaysNewsFlash.includes(`${[i, j + 1]}`)) {
		input[i][j + 1] += 1;
		if (input[i][j + 1] > 9) {
			// console.log('mrk_3')
			newsFlash(i, j + 1)
		}
	}
	if (j - 1 > -1 && !todaysNewsFlash.includes(`${[i, j - 1]}`)) {
		input[i][j - 1] += 1;
		if (input[i][j - 1] > 9) {
			// console.log('mrk_4')
			newsFlash(i, j - 1)
		}
	}

	if (i + 1 < 10 && j + 1 < 10 && !todaysNewsFlash.includes(`${[i + 1, j + 1]}`)) {
		input[i + 1][j + 1] += 1;
		if (input[i + 1][j + 1] > 9) {
			// console.log('mrk_5')
			newsFlash(i + 1, j + 1)
		}
	}
	if (i - 1 > -1 && j - 1 > -1 && !todaysNewsFlash.includes(`${[i - 1, j - 1]}`)) {
		input[i - 1][j - 1] += 1;
		if (input[i - 1][j - 1] > 9) {
			// console.log('mrk_6')
			newsFlash(i - 1, j - 1)
		}
	}
	if (i - 1 > -1 && j + 1 < 10 && !todaysNewsFlash.includes(`${[i - 1, j + 1]}`)) {
		input[i - 1][j + 1] += 1;
		if (input[i - 1][j + 1] > 9) {
			// console.log('mrk_7')
			newsFlash(i - 1, j + 1)
		}
	}
	if (i + 1 < 10 && j - 1 > -1 && !todaysNewsFlash.includes(`${[i + 1, j - 1]}`)) {
		input[i + 1][j - 1] += 1;
		if (input[i + 1][j - 1] > 9) {
			// console.log('mrk_8')
			newsFlash(i + 1, j - 1)
		}
	}
}