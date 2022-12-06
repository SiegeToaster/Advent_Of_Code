const fs = require('fs');

const data = fs.readFileSync("2022/day6/input.txt", "utf-8");


for (let i = 14; i < data.length; i++) {
	let success = true;
	message = data.slice(i - 14, i);
	if (message.match(/^.*(.).*\1.*$/)) success = false;

	if (success) {
		console.log(i);
		break;
	}
}

