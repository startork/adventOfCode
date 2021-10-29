const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

function calculateLine(line) {
  let acc = 0;
  let operator = "+";
  for (var x = 0, letter = ""; (letter = line.charAt(x)); x++) {
    switch (true) {
      case /[0-9]/g.test(letter):
        acc = eval(acc + operator + letter);
        break;
      case /\+|\*/.test(letter):
        operator = letter;
        break;
      case letter === "(":
        const result = calculateLine(line.substring(x + 1));
        x += result[1] + 1;
        acc = eval(acc + operator + result[0]);
        break;
      case letter === ")":
        return [acc, x];
    }
  }

  return [acc, x];
}

let sum = 0;
lines.forEach((line) => (sum += calculateLine(line)[0]));
//part one
console.log("Part 1: " + sum);

function doAddition(line) {
  while (/[0-9] \+ [0-9]/g.test(line)) {
    matches = line.match(/[0-9]+ \+ [0-9]+/g);
    line = line.replace(matches[0], eval(matches[0]) + "");
  }
  return line;
}

function doMultiplication(line) {
  while (/[0-9] \* [0-9]/g.test(line)) {
    matches = line.match(/[0-9]+ \* [0-9]+/g);
    line = line.replace(matches[0], eval(matches[0]) + "");
  }
  return line;
}

function simplifyBrackets(line) {
  while (/\([0-9 \*\+]+\)/g.test(line)) {
    matches = line.match(/\([0-9 \*\+]+\)/g);
    line = line.replace(matches[0], eval(matches[0]) + "");
    line = doAddition(line);
  }
  return line;
}

results = lines.map((line) => {
  line = doAddition(line);
  line = simplifyBrackets(line);
  line = doMultiplication(line);
  return parseInt(line);
});
//part two
console.log("Part 2: " + results.reduce((a, b) => a + b, 0));
