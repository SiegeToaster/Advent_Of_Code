const fs = require('fs');

const raw = fs.readFileSync("day2/part1/input.txt", "utf-8");
const commandsArr = raw.split('\r');
let forwardCommandsArr = [];
let forwardTotal = 0;
let depthCommandsArr = [];
let depthTotal = 0;

for (let i = 0; i < commandsArr.length; i++) {
	if (commandsArr[i].includes('\n')) commandsArr[i] = commandsArr[i].slice(1);
	if (commandsArr[i].startsWith('forward')) forwardCommandsArr.push(commandsArr[i]);
	if (commandsArr[i].startsWith('up') || commandsArr[i].startsWith('down')) depthCommandsArr.push(commandsArr[i]);
} // segregate commands

for (let command of forwardCommandsArr) {
	forwardTotal += parseInt(command.slice(8));
} // total forward

for (let command of depthCommandsArr) {
	if (command.startsWith('down')) {
		depthTotal += parseInt(command.slice(5));
	} else {
		depthTotal -= parseInt(command.slice(3));
		
	}
}

console.log(forwardTotal * depthTotal)