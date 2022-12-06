const fs = require('fs');

const data = fs.readFileSync("2022/day6/input.txt", "utf-8");


for (let i = 3; i < data.length; i++) {
	let success = true;
	const first = data[i - 3];
	const second = data[i - 2];
	const third = data[i - 1];
	const fourth = data[i];

	if (
		[second, third, fourth].includes(first) ||
		[first, third, fourth].includes(second) ||
		[first, second, fourth].includes(third) ||
		[first, second, third].includes(fourth)
	) {
		success = false;
	}

	if (success) {
		console.log(i + 1);
		break;
	}
}

