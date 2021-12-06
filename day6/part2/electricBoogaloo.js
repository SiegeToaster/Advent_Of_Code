/*
	This will be easy!  I'll just increase 'day < 80' to 'day < 256'

	Computer proceeds to shit itself because it cannot handle an array with 5 trillion entities
*/

const fs = require('fs');

const raw = fs.readFileSync("day6/part1/input.txt", "utf-8");
const input = raw.split(',');
let fishiesArr = new Array(9);
let finalPop = 0;

for (let i = 0; i < fishiesArr.length; i++) {
	fishiesArr[i] = 0;
}
for (let i = 0; i < input.length; i++) {
	input[i] = parseInt(input[i]);
}
for (let fishy of input) {
	fishiesArr[fishy]++ 
}
// construction

for (let day = 0; day < 256; day++) {
	const deadFishies = fishiesArr.shift();
	fishiesArr[6] += deadFishies;
	fishiesArr[8] = deadFishies;
}

for (let i = 0; i < fishiesArr.length; /*why am I putting .length when I know the length is 9?*/ i++) {
	finalPop += fishiesArr[i];
}


console.log(finalPop);