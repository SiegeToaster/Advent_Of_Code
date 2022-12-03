const fs = require('fs');

const raw = fs.readFileSync("2022/day3/input.txt", "utf-8");
const instructions = raw.split('\r\n');
let total = 0;

for (let instruction of instructions) {
	const half = instruction.length / 2;
	const sack1 = instruction.slice(0, half).split('');
	const sack2 = instruction.slice(half).split('');
	let commonItem;
	let value;

	for (let searchItem of sack1) {
		for (let searched of sack2) {
			if (searchItem == searched) {
				commonItem = searchItem;
				break;
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
