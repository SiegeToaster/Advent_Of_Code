const fs = require('fs');

const raw = fs.readFileSync("2022/day5/input.txt", "utf-8");
let instructions = raw.split('\r\n\r\n');
let initial = instructions[0].split('\r\n');
initial.pop();
instructions = instructions[1].split('\r\n');
let rows = [];
let final = '';

for (let i in initial) {
	let row = initial[i].slice(1);
	let column = 0;
	while (row.length > 1) {
		if (rows[column] == undefined) rows[column] = [];
		if (row[0] != ' ') {
			rows[column].push(row[0]);
		};
		column++;
		row = row.slice(4);
	}
}

for (let instruction of instructions) {
	instruction = instruction.slice(5);
	let fromValue = parseInt(instruction[instruction.search(' from ') + 6]);
	let toValue = parseInt(instruction[instruction.search(' to ') + 4]);;
	for (let i = 0; i < parseInt(instruction.slice(0, instruction.search(' '))); i++) {
		let moved = rows[fromValue - 1].shift();
		rows[toValue - 1].unshift(moved);
	}
}

for (let row of rows) {
	final += row[0];
}
console.log(final);
