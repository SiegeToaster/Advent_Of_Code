const fs = require('fs');

const raw = fs.readFileSync("2021/day4/part1/input.txt", "utf-8");
const input = raw.split('\n\r\n');
const drawNums = input[0].split(',');
const boards = input.splice(1);
let howtfAmIGoingToDoThis = new Map();
let winnerValues;
let sumMarkedNums = 0;
let winArray = [];

drawNums.forEach((num, index) => {
	drawNums[index] = parseInt(num);
});


for (let i = 0; i < boards.length; i++) {
	howtfAmIGoingToDoThis.set(`${i}`, new Map());
	howtfAmIGoingToDoThis.get(`${i}`).set('fullArr', boards[i]);

	howtfAmIGoingToDoThis.get(`${i}`).set('rows', new Map());
	const rowsArr = howtfAmIGoingToDoThis.get(`${i}`).get('fullArr').split('\r\n');
	for (let r = 0; r < 5; r++) {
		howtfAmIGoingToDoThis.get(`${i}`).get('rows').set(`${r}`, new Map())
		const rowArr = rowsArr[r].split(/ +/g); // white space repeating regex (not all values are seperated by 1 space)
		if (rowArr.length > 5) rowArr.splice(0, 1); // space before first character would screw it up
		for (let v = 0; v < 5; v++) {
			howtfAmIGoingToDoThis.get(`${i}`).get('rows').get(`${r}`).set(parseInt(rowArr[v]), false); // bool is whether or not number is called
		}
	}

	howtfAmIGoingToDoThis.get(`${i}`).set('columns', new Map());
	for (let c = 0; c < 5; c++) {
		howtfAmIGoingToDoThis.get(`${i}`).get('columns').set(`${c}`, new Map())
		for (let j = 0; j < 5; j++) {
			const rowArr = Array.from(howtfAmIGoingToDoThis.get(`${i}`).get('rows').get(`${j}`).keys());
			howtfAmIGoingToDoThis.get(`${i}`).get('columns').get(`${c}`).set(parseInt(rowArr[c]), false);
		}
	}
} // constructs maps with columns and rows

for (let z = 0; z < drawNums.length; z++) {
	howtfAmIGoingToDoThis.forEach((board, key) => {
		// console.log(board);
		board.get('rows').forEach(value1 => {
			// console.log('\nvalue: ')
			// console.log(value1);
			if (Array.from(value1.keys()).includes(drawNums[z])) {
				value1.set(drawNums[z], true);
			}
			const arr = Array.from(value1.values())
			checkWinner(board,'rows', arr, z);
		})
		board.get('columns').forEach(value2 => {
			if (Array.from(value2.keys()).includes(drawNums[z])) {
				value2.set(drawNums[z], true);
			}
			const arr = Array.from(value2.values())
			checkWinner(board, 'columns', arr, z);
		})
		// console.log('\n\nbreak\n\n')
	});
}

// console.log(winnerValues);

for (let l = 0; l < winnerValues[1].length; l++) {
	if (!winnerValues[1][l][1]) {
		sumMarkedNums += winnerValues[1][l][0];
	}
}

console.log(sumMarkedNums);
console.log(sumMarkedNums * winnerValues[0]);


function checkWinner(board, type, arr, z) {
	if (!arr.includes(false) && winnerValues == null) {
		let winMap = Array.from(board.get(type).values());
		for (let a = 0; a < winMap.length; a++) {
			winMap[a].forEach((winValue, winKey) => {
				winArray.push([winKey, winValue]);
			})
			// console.log(winMap);
		}
		winnerValues = [drawNums[z], winArray];
	}
}