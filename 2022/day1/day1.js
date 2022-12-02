const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

//part one
const elfs = text.split("\r\n\r\n");

const elfTotals = elfs.map((string) => {
  return string.split("\r\n").reduce((a, b) => Number(a) + Number(b), 0);
});

console.log(Math.max(...elfTotals));

// Part Two
const topThree = elfTotals.reduce(
  (a, b) => {
    if (b > a[2]) {
      a[0] = a[1];
      a[1] = a[2];
      a[2] = b;
    } else if (b > a[1]) {
      a[0] = a[1];
      a[1] = b;
    } else if (b > a[0]) {
      a[0] = b;
    }
    return a;
  },
  [0, 0, 0]
);

console.log(topThree.reduce((a,b) => a + b, 0));
