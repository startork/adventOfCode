const fs = require('fs');

const text = fs.readFileSync('input.txt', {encoding: 'utf-8'});

const sorted = text.split("\r\n").map((line) => parseInt(line)).sort((a, b) => a - b);

// Can use a simple reduce but start gaps of 3 at 1 to consider computer
const result = sorted.reduce((a,b) => {
  const gap = b - a[2];
  if (gap === 1) {
    return [a[0] + 1, a[1], b];
  } else if (gap === 3) {
    return [a[0], a[1] + 1, b];
  } else {
    return [a[0], a[1], b];
  }
},[0,1,0]);
// step one
console.log(result[0]*result[1]);

const allGaps = sorted.map((el, i) => {
  if (i > 0) {
    return el - sorted[i - 1];
  } 
  return el;
});
const oneGroups = allGaps.reduce((a,b) => {
  if (b === 1) {
    a[a.length - 1] += 1;
  } else {
    a.push(0);
  }
  return a;
}, [0])
const answer = oneGroups.reduce((a, b) => {
  if (b > 1) {
    return a * (0.5*Math.pow(b,2) - 0.5*b + 1);
  } else {
    return a;
  }
}, 1)
//step two
console.log(answer);