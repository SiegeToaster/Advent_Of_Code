const fs = require('fs');
const md5 = require("blueimp-md5");

const raw = fs.readFileSync("2015/day4/input.txt", "utf-8");

let md5Result = '';
let number = 0;

while (!md5Result.startsWith('00000')) {
	number += 1;
	const input = raw + number.toString();
	md5Result = md5(input);
}

console.log(number);
