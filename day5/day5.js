const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
var lines = text.split("\n");
const seats = lines.map((element) =>
  parseInt(element.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2)
);

var mySeat = 0;
var i = 0;
for (i = Math.min(...seats); i < Math.max(...seats); i++) {
  if (!seats.includes(i) && seats.includes(i + 1) && seats.includes(i - 1)) {
    mySeat = i;
  }
}

console.log("Part 1: " + Math.max(...seats));
console.log("Part 2: " + mySeat);
