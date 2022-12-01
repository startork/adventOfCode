const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const numbers = text.split("\n");

//part one
numbers.find((num) => {
  poss = numbers.find((num2) => +num2 + +num === 2020);
  if (poss > 0) {
    console.log("Part 1: " + num * poss);
    return true;
  }
});

//part two
numbers.find((num) => {
  attempt = numbers.find((num2) => {
    if (+num2 + +num >= 2020) {
      return false;
    }
    poss = numbers.find((num3) => +num2 + +num + +num3 === 2020);
    if (poss > 0) {
      console.log("Part 2: " + num * num2 * poss);
      return true;
    }
  });
  if (attempt > -1) {
    return true;
  }
});
