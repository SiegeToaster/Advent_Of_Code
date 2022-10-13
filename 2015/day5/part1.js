const fs = require('fs');

const raw = fs.readFileSync("2015/day5/input.txt", "utf-8");
const allStrings = raw.split('\r\n');

let niceStrings = 0;

for (let i = 0; i < allStrings.length; i++) {
	const string = allStrings[i];
	if (string.includes('ab') || string.includes('cd') || string.includes('pq') || string.includes('xy')) {
		continue;
	}

	const allChars = string.split('');
	let vowelsCount = 0;
	let hasDouble = false;
	let lastChar = '';
	for (let j = 0; j < allChars.length; j++) {
		if (['a','e','i','o','u'].includes(allChars[j])) {
			vowelsCount += 1;
		}
		if (allChars[j] == lastChar) hasDouble = true;
		lastChar = allChars[j];
	}
	if (vowelsCount < 3) continue;
	if (hasDouble) niceStrings += 1;
}

console.log(niceStrings)
