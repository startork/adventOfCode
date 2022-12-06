const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

// Part One
const elves = text.split("\r\n").map((e) => {
  const left = e.substring(0, e.length / 2);
  const right = e.substring(e.length / 2);
  return [left, right];
});
const scores = elves.map((e) => {
  const letter =
    e[0]
      .split("")
      .find((l) => e[1].includes(l))
      .charCodeAt(0) - 96;
  return letter < 0 ? letter + 58 : letter;
});
console.log(scores.reduce((a, b) => a + b, 0));

// Part Two
const elvesV2 = text.split("\r\n").reduce((a, b) => {
  const currIndex = a.length - 1;
  if (a[currIndex].length < 3) a[currIndex].push(b);
  else a.push([b]);

  return a;
}, [[]]);

const scoresV2 = elvesV2.map(e => {
  const letter =
  e[0]
    .split("")
    .find((l) => e[1].includes(l) && e[2].includes(l))
    .charCodeAt(0) - 96;
    return letter < 0 ? letter + 58 : letter;
})
console.log(scoresV2.reduce((a,b) => a+b, 0));