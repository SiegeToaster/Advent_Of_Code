const fs = require('fs');

const raw_data = fs.readFileSync("2022/day7/input.txt", "utf-8");
const data = raw_data.split('\r\n')

const directories = new Map();

recurse(0, '/', 'C:');

function recurse(index, directory, fullDir) {
  let total = 0;
  fullDir += '/' + directory;

  while (data[index] != `$ cd ${directory}`) {
    index++;
  }
  index += 2;

  while (data[index] != undefined && !data[index].startsWith('$')) {
    if (data[index].startsWith("dir ")) {
      total += recurse(index, data[index].substring(4), fullDir);
    } else {
      total += parseInt(data[index].substring(0, data[index].indexOf(' ')));
    }

    index++;
  }

  directories.set(fullDir, total);
  console.log(`${fullDir}: ${directories.size}`);
  return total;
}

console.log(directories);

let final = 0;

directories.forEach(element => {
  if (element <= 100000) {
    final += element;
  }
});

// 979023 too low
// 1677969 too high
console.log(final);
