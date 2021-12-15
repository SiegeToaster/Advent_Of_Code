console.time();

const fs = require('fs');

const raw = fs.readFileSync("2021/day12/part1/input.txt", "utf-8");
const input = raw.split('\r\n');
let allCaves = new Set();
let caveMap = new Map();
let smallCaves = new Array();
let bigCaves = new Array();
let allPaths = new Set(); // should be an array of arrays.  Each subarray should be a path
// make a map of each cave to the other cave and vice versa (start => A, A => start, A => c, c => A)

for (let i = 0; i < input.length; i++) {
	const caves = input[i].split('-');
	caves.forEach(cave => allCaves.add(cave));
}
allCaves = Array.from(allCaves);

for (let direction of input) {
	direction = direction.split('-');
	const first = direction[0];
	const second = direction[1];
	if (!caveMap.has(first)) caveMap.set(first, new Array());
	if (!caveMap.has(second)) caveMap.set(second, new Array());

	const firstMapValue = caveMap.get(first);
	const secondMapValue = caveMap.get(second);
	firstMapValue.push(second);
	secondMapValue.push(first);

	caveMap.set(first, firstMapValue);
	caveMap.set(second, secondMapValue);
	// console.log(direction);
}
caveMap.delete('end');
caveMap.forEach(value => {
	while (value.includes('start')) { // pretty sure this is not needed and an if would do, oh well.
		value.splice(value.indexOf('start'), 1);
	}
})

for (let cave of allCaves) {
	if (cave === 'start' || cave === 'end') continue;
	if (cave === cave.toLowerCase()) {
		smallCaves.push(cave);
	} else {
		bigCaves.push(cave);
	}
}

// console.log('\n');
// console.log(allCaves);
// console.log(caveMap);
// console.log(smallCaves);
// console.log(bigCaves);
// console.log(input);

searchLevel('start', 'start,', false);


console.log('\nResult:')
console.log(allPaths.size);
console.timeEnd();


function searchLevel(startCave, breadCrumbs, visitedTwiceBS) {
	const rollbackBreadCrumbs = breadCrumbs;
	const rollbackVisitedTwiceBS = visitedTwiceBS;
	const nextCaves = caveMap.get(startCave);
	for (let i = 0; i < nextCaves.length; i++) {
		breadCrumbs = rollbackBreadCrumbs;
		visitedTwiceBS = rollbackVisitedTwiceBS;

		if (
			(visitedTwiceBS && nextCaves[i].toLowerCase() === nextCaves[i]) // checks if a cave has been visited twice and if a cave is lowercase
			&& // if cave isn't lowecase, won't check next line
			breadCrumbs.includes(nextCaves[i])
		) continue;

		if (nextCaves[i].toLowerCase() === nextCaves[i] && breadCrumbs.includes(nextCaves[i])) visitedTwiceBS = true;
		breadCrumbs += `${nextCaves[i]},`
		
		if (nextCaves[i] === 'end') {
			allPaths.add(breadCrumbs);
		} else {
			searchLevel(nextCaves[i], breadCrumbs, visitedTwiceBS);
		}
	}
}