const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\r\n");

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
console.log(sum);

function formatLine(line) {
  let acc = 0;
  let operator = "+";
  for (var x = 0, letter = ""; (letter = line.charAt(x)); x++) {
    switch (true) {
      case /[0-9]/g.test(letter):
        if (operator === "+") {
          acc = eval(acc + operator + letter);
        } else {
          const result = calculateLine(line.substring(x + 1));
          x += result[1] + 1;
          acc = eval(acc + operator + result[0]);
        }
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

let partTwoSum = 0;
lines.forEach((line) => (partTwoSum += calculatePartTwoLine(line)[0]));
//part one
console.log(sum);
