const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

// Part One
const index = text.split("").findIndex((a, i, self) => {
  if (i > 3) {
    return (
      self.slice(i - 3, i + 1).filter((cut, ind, s) => s.indexOf(cut) === ind)
        .length === 4
    );
  }
  return false;
});
console.log(index + 1);

// Part Two
const indexV2 = text.split("").findIndex((a, i, self) => {
  if (i > 13) {
    return (
      self.slice(i - 13, i + 1).filter((cut, ind, s) => s.indexOf(cut) === ind)
        .length === 14
    );
  }
  return false;
});
console.log(indexV2 + 1);