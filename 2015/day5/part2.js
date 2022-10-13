const fs = require('fs');

const raw = fs.readFileSync("2015/day5/input.txt", "utf-8");
const allStrings = raw.split('\r\n');

let niceStrings = 0;

for (let i = 0; i < allStrings.length; i++) {
	const string = allStrings[i];
	const allChars = string.split('');

	let hasDouble = false;
	for (let j = 2; j < allChars.length; j++) {
		if (allChars[j] == allChars[j - 2]) hasDouble = true;
	}

	let pairs = new Map();
	for (let j = 1; j < allChars.length; j++) {
		const newPair = allChars[j - 1] + allChars[j];
		if (j > 1) {
			const overlapCheck = allChars[j - 2] + allChars[j - 1];
			if (newPair == overlapCheck) continue;
		}

		let oldValue = 0;
		if (pairs.has(newPair)) {
			oldValue = pairs.get(newPair);
		}
		pairs.set(newPair, oldValue + 1);
	}

	if (hasDouble && (Array.from(pairs.values()).sort((a, b) => b - a)[0] >= 2)) {
		niceStrings += 1;
		console.log(string);
	}
}

// console.log(niceStrings)

// cheating
function nice2(str) {
	let repeat=str.match(/([a-z][a-z])[a-z]*\1/);
	let zxz=str.match(/([a-z])[a-z]\1/);
	return (repeat!=undefined&&repeat.length>0)&&(zxz!=undefined&&zxz.length>0)
}
console.log(allStrings.filter(nice2).length);