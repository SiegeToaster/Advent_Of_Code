const fs = require('fs');

const raw = fs.readFileSync("2021/day2/part1/input.txt", "utf-8");
const commandsArr = raw.split('\r');
let forwardTotal = 0;
let depthTotal = 0;
let aim = 0;

for (let i = 0; i < commandsArr.length; i++) {
	if (commandsArr[i].includes('\n')) commandsArr[i] = commandsArr[i].slice(1);
} // remove C R I N G E \n character

for (let command of commandsArr) {
	if (command.startsWith('forward')) {
		forwardTotal += parseInt(command.slice(8));
		depthTotal += parseInt(command.slice(8)) * aim;
	} else { // could do else if but this is easier to read
		if (command.startsWith('up')) {
			aim -= parseInt(command.slice(3));
		} else {
			aim += parseInt(command.slice(5));
		}
	}

	// debug
	// console.log('\n');
	// console.log(command);
	// console.log(`aim: ${aim}`);
	// console.log(`forward ${forwardTotal}`);
	// console.log(`depth ${depthTotal}`);
}

console.log(forwardTotal * depthTotal);