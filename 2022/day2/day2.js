const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

// Part One
const winMap = {
  'Z': 3,
  'Y': 2,
  'X': 1,
  'AX': 3,
  'AY': 6,
  'AZ': 0,
  'BX': 0,
  'BY': 3,
  'BZ': 6,
  'CX': 6,
  'CY': 0,
  'CZ': 3
}
const games = text.split('\r\n');
const scores = games.map((g) => {
  const [you, me] = g.split(' ');
  return winMap[you + me] + winMap[me]; 
})
console.log(scores.reduce((a,b) => a + b, 0));

// Part Two
const winMapv2 = {
  'Z': 6,
  'Y': 3,
  'X': 0,
  'AX': 3,
  'AY': 1,
  'AZ': 2,
  'BX': 1,
  'BY': 2,
  'BZ': 3,
  'CX': 2,
  'CY': 3,
  'CZ': 1
}
const scoresv2 = games.map((g) => {
  const [you, me] = g.split(' ');
  return winMapv2[you + me] + winMapv2[me]; 
})
console.log(scoresv2.reduce((a,b) => a + b, 0));
