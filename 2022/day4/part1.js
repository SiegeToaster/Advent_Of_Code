const fs = require('fs');

const raw = fs.readFileSync("2022/day4/input.txt", "utf-8");
const pairs = raw.split('\r\n');
let num = 0;

for (let pair of pairs) {
	let inclusive = true;

	pair = pair.split(',');
	for (let i in pair) {
		pair[i] = pair[i].split('-');
		pair[i][0] = parseInt(pair[i][0]);
		pair[i][1] = parseInt(pair[i][1]);
	}
	let range1 = [];
	let range2 = [];
	for (let i = pair[0][0]; i <= pair[0][1]; i++) {
		range1.push(i);
	}
	for (let i = pair[1][0]; i <= pair[1][1]; i++) {
		range2.push(i);
	}

	for (let searchNum of range1) {
		if (!range2.includes(searchNum)) {
			inclusive = false;
			break;
		}
	}

	if (!inclusive) {
		inclusive = true;
		for (let searchNum of range2) {
			if (!range1.includes(searchNum)) {
				inclusive = false;
				break;
			}
		}
	}

	if (inclusive) num += 1;
}

console.log(num);
