const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

var partOneLines = lines.slice();
partOneLines.forEach((element, i) => {
  if (!element) partOneLines[i] = "&&";
});
groups = partOneLines.join("").split("&&");
groups.forEach((element, i) => {
  groups[i] = new Set(element).size;
});
const answerStep1 = groups.reduce((a, b) => a + b, 0);

var partTwoLines = lines.slice();
partTwoLines.forEach((element, i) => {
  if (!element) partTwoLines[i] = "&";
});
groups = partTwoLines.join("&").split("&&&");
groups.forEach((element, i) => {
  groups[i] = element.split("&");
});
groupYes = groups.map((element) => {
  var arrayNum = element.reduce(
    (a, b) => a.filter((element) => [...b].includes(element)),
    [...element[0]]
  );
  return arrayNum.length;
});

const answerStep2 = groupYes.reduce((a, b) => a + b, 0);

console.log("Part 1: " + answerStep1);
console.log("Part 2: " + answerStep2);
