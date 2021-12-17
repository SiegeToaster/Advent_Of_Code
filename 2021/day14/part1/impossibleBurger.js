console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day14/part1/input.txt", "utf-8");
let input = raw.split('\r\n');
let polymer = input[0];
const pairInsertionRules = new Map();
const elements = new Map();
input.splice(0, 2);

for (let rule of input) {
	rule = rule.split(' -> ');
	pairInsertionRules.set(rule[0], rule[1]);
} // format rules


let polymerArr;
for (let a = 0; a < 10; a++) {
	polymerArr = polymer.split('');
	for (let i = 0; i < polymerArr.length - 1; i++) {
		const twoThingy = polymerArr[i] + polymerArr[i + 1];
		// console.log('\n');
		// console.log(twoThingy);
		// console.log(polymer);
		if (pairInsertionRules.has(twoThingy)) {
			polymerArr.splice(i + 1, 0, pairInsertionRules.get(twoThingy));
			i++;
		}
		// console.log(polymerArr);
	}
	polymer = polymerArr.join('');
} // create polymer
polymerArr = polymer.split('');


for (let element of polymerArr) {
	elements.set(element, elements.has(element) ? elements.get(element) + 1 : 1);
}
polymerArr = Array.from(elements.values())
polymerArr.sort((a, b) => b - a);


const solution = polymerArr[0] - polymerArr[polymerArr.length - 1];
console.log(solution);
console.timeEnd();