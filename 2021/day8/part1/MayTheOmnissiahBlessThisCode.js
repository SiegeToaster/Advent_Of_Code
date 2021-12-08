/* Notes
Lengthi:
	0: 6
	1: 2 *
	2: 5
	3: 5
	4: 4 *
	5: 5
	6: 6
	7: 3 *
	8: 7 *
	9: 6


*/

const fs = require('fs');

const raw = fs.readFileSync("2021/day8/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let numOfWakeyDigits = 0;

for (let i = 0; i < input.length; i++) {
	input[i] = input[i].split(' | ');
	input[i][0] = input[i][0].split(' ');
	input[i][1] = input[i][1].split(' ');
} // format [unit signal patterns[10], four digit output value[4]]

// console.log(input);

for (let i = 0; i < input.length; i++) {
	// console.log(input[i][1]);
	for (let wtfIsGoinOn = 0; wtfIsGoinOn < 4; wtfIsGoinOn++) {
		if (input[i][1][wtfIsGoinOn].length === 2 || input[i][1][wtfIsGoinOn].length === 3 || input[i][1][wtfIsGoinOn].length === 4 || input[i][1][wtfIsGoinOn].length === 7) numOfWakeyDigits++;
	}
}

console.log(numOfWakeyDigits);