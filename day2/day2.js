const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

// Step Two
const num = lines.filter((line) => {
  const test = line.split(" ");
  const [min, max] = test[0].split("-");
  const letter = test[1].split(":")[0].trim();
  const name = test[2].trim();
  const first = name[+min - 1] === letter;
  const second = name[+max - 1] === letter;

  return first !== second;
}).length;

// Step One
const numTwo = lines.filter((line) => {
  const test = line.split(" ", 3);
  const [min, max] = test[0].split("-");
  const letter = test[1].split(":")[0];
  const name = test[2];
  const corrletters = name.length - name.replaceAll(letter, "").length;

  return +min <= corrletters && corrletters <= +max;
}).length;

console.log("Part 1: " + numTwo);
console.log("Part 2: " + num);
