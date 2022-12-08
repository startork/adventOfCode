const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

// Part One
const ranges = text.split("\r\n").map((str) => {
  const r = str.split("-");
  const mid = r[1].split(",");

  return [+r[0], +mid[0], +mid[1], +r[2]];
});

console.log(
  ranges.reduce((a, b) => {
    if ((b[0] <= b[2] && b[3] <= b[1]) || (b[2] <= b[0] && b[1] <= b[3])) {
      return a + 1;
    }
    return a;
  }, 0)
);

// Part Two
const between = (a,b,c) => {
  return a <= c && a >= b;
}
console.log(between(2,1,3));
console.log(
  ranges.reduce((a, b) => {
    if (
      between(b[0], b[2], b[3]) ||
      between(b[1], b[2], b[3]) ||
      between(b[2], b[0], b[1]) ||
      between(b[3], b[0], b[1])
    ) {
      return a + 1;
    }
    return a;
  }, 0)
);
