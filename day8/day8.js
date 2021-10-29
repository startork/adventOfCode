const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

var newLines = [];
newLines = lines.slice();
// part one
results = runLoop();

for (i = 0; i < results[2].length; i++) {
  newLines = lines.slice(0);
  index = results[2][i];
  const [inst, amount] = newLines[index].split(" ");
  switch (inst) {
    case "acc":
      break;
    case "nop":
      newLines[index] = "jmp " + amount;
      break;
    case "jmp":
      newLines[index] = "nop " + amount;
      break;
  }
  if (!(inst === "acc") && !runLoop()[0]) {
    break;
  }
}

console.log("Part 1: " + results[1]);
console.log("Part 2: " + runLoop()[1]);

function runLoop() {
  var completed = [];
  var acc = 0;
  var index = 0;
  while (!completed.includes(index) && index < newLines.length) {
    completed.push(index);
    const [instr, amount] = newLines[index].split(" ");
    switch (instr) {
      case "jmp":
        index = index + eval(amount);
        break;
      case "acc":
        acc = acc + eval(amount);
      case "nop":
        index++;
        break;
    }
  }
  return [completed.includes(index), acc, completed];
}
