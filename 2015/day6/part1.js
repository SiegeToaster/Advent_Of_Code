const fs = require('fs');
const { start } = require('repl');
console.time()
const raw = fs.readFileSync("2015/day6/input.txt", "utf-8");
const allInstructions = raw.split('\r\n');

const lights = new Map();
for (let x = 0; x < 1000; x++) {
	for (let y = 0; y < 1000; y++) {
		lights.set(`${x},${y}`,false);
	}
}

for (let i = 0; i < allInstructions.length; i++) {
	let instruction = allInstructions[i];
	let type = 0;
	if (instruction.startsWith("turn on ")) {
		type = 1;
		instruction = instruction.slice(8);
	} else if (instruction.startsWith("toggle ")) {
		type = 2;
		instruction = instruction.slice(7);
	} else {
		instruction = instruction.slice(9);
	}

	console.log(type, allInstructions[i]);
	
	instruction = instruction.split(' ');
	let start = instruction[0].split(',');
	let end = instruction[2].split(',');

	start.forEach((element, index) => {
		start[index] = parseInt(element);
	});
	end.forEach((element, index) => {
		end[index] = parseInt(element);
	});

	for (let x = start[0]; x <= end[0]; x++) {
		for (let y = start[1]; y <= end[1]; y++) {
			switch (type) {
				case 0:
					lights.set(`${x},${y}`,false);
					break;
				case 1:
					lights.set(`${x},${y}`,true);
					break;
				case 2:
					lights.set(`${x},${y}`,!lights.get(`${x},${y}`))
					break;
			}
		}
	}
}

const onLights = new Map(
	[...lights]
	.filter(([k,v]) => v)
);
console.log(onLights.size)
console.timeLog()