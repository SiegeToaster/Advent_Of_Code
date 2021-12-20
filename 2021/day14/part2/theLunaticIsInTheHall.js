console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day14/part1/input.txt", "utf-8");
let input = raw.split('\r\n');

let pairInsertionRules = new Map();
let elements = new Map();
let polymerPairsBS = new Map();
polymerPairsBS = countShit(input[0]);

input.splice(0, 2);
for (let rule of input) {
	rule = rule.split(' -> ');
	pairInsertionRules.set(rule[0], rule[1]);
} // format rules

for (let a = 0; a < 40; a++) {
	let newMap = new Map();
	polymerPairsBS.forEach((value, key) => {
		if (pairInsertionRules.has(key)) {
			// the two sets in here basically take the pair that comes from adding the new letter in the middle, checks if they are already in the map, then adds the new value.
			newMap.set(key[0] + pairInsertionRules.get(key),
				newMap.has(key[0] + pairInsertionRules.get(key)) ?
				newMap.get(key[0] + pairInsertionRules.get(key)) + value :
				value
			);
			newMap.set(pairInsertionRules.get(key) + key[1],
				newMap.has(pairInsertionRules.get(key) + key[1]) ?
				newMap.get(pairInsertionRules.get(key) + key[1]) + value :
				value
			);
		}
	})
	polymerPairsBS = newMap;
} // create polymergoner

const first = [...polymerPairsBS][0];
elements.set(first[0][0], first[1]);

polymerPairsBS.forEach((value, key) => {
	elements.set(key[1],
		elements.has(key[1]) ? // if the element is already in the list
		elements.get(key[1]) + value : // add the new value to the existing one
		value // else set it to the new value
	);
});

elements = [...elements.values()];
elements.sort((a, b) => b - a)

const solution = elements[0] - elements.at(-1);
console.log(solution);
console.timeEnd();


function countShit(str) {
	/*  need to count how many string pairs are in the string
		example input would be
		NN: 1
		NC: 1
		CB: 1 */
	let map = new Map();
	if (str === undefined) return map;

	for (let i = 0; i < str.length - 1; i++) {
		map.set(`${str[i]}${str[i + 1]}`,
			map.has(`${str[i]}${str[i + 1]}`) ? // if the map already has the pair
			map.get(`${str[i]}${str[i + 1]}`) + 1 : // take the value it has and add one
			1 // else set it to 1
		)
	}

	return map;
}