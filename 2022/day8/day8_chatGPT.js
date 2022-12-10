const fs = require('fs');

// read the input file
const input = fs.readFileSync('input.txt', 'utf8');

// split the input into lines
const lines = input.split('\r\n');

// create a 2D array of digits from the input lines
const map = lines.map(line => line.split('').map(digit => parseInt(digit, 10)));

// initialize the count of visible trees to 0
let visibleTrees = 0;

// loop through each row of the grid
for (let i = 0; i < map.length; i++) {
  // loop through each column of the grid
  for (let j = 0; j < map[i].length; j++) {
    // get the current tree height
    const height = map[i][j];

    // check if the tree is visible from the left edge
    const left = map[i].slice(0, j).every(tree => tree < height);

    // check if the tree is visible from the right edge
    const right = map[i].slice(j + 1).every(tree => tree < height);

    // check if the tree is visible from the top edge
    const up = map.slice(0, i).every(row => row[j] < height);

    // check if the tree is visible from the bottom edge
    const down = map.slice(i + 1).every(row => row[j] < height);

    // if the tree is visible from any edge, increment the count of visible trees
    if (left || right || up || down) {
      visibleTrees++;
    }
  }
}

// print the count of visible trees
console.log(visibleTrees);
