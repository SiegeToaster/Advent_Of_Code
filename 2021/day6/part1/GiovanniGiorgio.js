const fs = require('fs');

const raw = fs.readFileSync("2021/day6/part1/input.txt", "utf-8");
const input = raw.split(',');

for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i])
}

console.log(input);

for (let day = 0; day < 80; day++) {
	for (let i = 0; i < input.length; i++) {
		input[i] = input[i] - 1;
		if (input[i] < 0) {
			input[i] = 6;
			input.push(9); // if it is 8, it gets reduced to 7.  Could fix by making changing input.length condition to a fixed value, but this is easier
		}
	}
}

console.log(input);
console.log(input.length);