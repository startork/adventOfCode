const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [cratesRaw, instructionsRaw] = text.split("\r\n\r\n");

const crates = cratesRaw.split("\r\n").reduce((a, left) => {
  let i = 0;
  while (!!left) {
    const update = left.substring(0, 4);
    left = left.substring(4);
    const raw = update.replace(/[\[\] ]*/g, "");
    if (+raw > 0) return a;
    if (raw) {
      a[i] ? a[i].unshift(raw) : (a[i] = [raw]);
    }
    i++;
  }
  return a;
}, []);

const cratesV2 = cratesRaw.split("\r\n").reduce((a, left) => {
  let i = 0;
  while (!!left) {
    const update = left.substring(0, 4);
    left = left.substring(4);
    const raw = update.replace(/[\[\] ]*/g, "");
    if (+raw > 0) return a;
    if (raw) {
      a[i] ? a[i].unshift(raw) : (a[i] = [raw]);
    }
    i++;
  }
  return a;
}, []);

const instructions = instructionsRaw.split("\r\n").map((str) => {
  const a = str.split(" from ");
  const b = a[1].split(" to ");
  return [+a[0].split(" ")[1], +b[0] - 1, +b[1] - 1];
});

// Part One
const newCrates = instructions.reduce((result, instr) => {
  for (let i = 0; i < instr[0]; i++) {
    result[instr[2]].push(result[instr[1]].pop());
  }
  return result;
}, crates);

console.log(newCrates.reduce((a, b) => a + b[b.length - 1], ""));

// Part Two
const newCrates2 = instructions.reduce((result, instr) => {
  let cratesMoved = [];
  
  for (let i = 0; i < instr[0]; i++) {
    cratesMoved.unshift(result[instr[1]].pop());
  }
  
  result[instr[2]].push(...cratesMoved);
  
  return result;
}, cratesV2);

console.log(newCrates2.reduce((a, b) => a + b[b.length - 1], ""));

