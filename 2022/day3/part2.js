const fs = require('fs');

const raw = fs.readFileSync("2022/day3/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let total = 0;

for (let i = 0; i < instructions.length; i = i + 3) {
	let groupSacks = [
		instructions[i],
		instructions[i + 1],
		instructions[i + 2]
	]
	let commonItem;
	let value;

	for (let first of groupSacks[0]) {
		for (let second of groupSacks[1]) {
			if (first == second) {
				for (let third of groupSacks[2]) {
					if (first == third) {
						commonItem = first;
					}
				}
			}
		}
	}

	if (commonItem == commonItem.toUpperCase()) {
		value = commonItem.charCodeAt(0) - 38;
	} else {
		value = commonItem.charCodeAt(0) - 96;
	}

	total += value;
}

console.log(total);
