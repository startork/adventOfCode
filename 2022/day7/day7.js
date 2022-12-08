const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

const instr = text.split("\r\n");

// Part One
const dirs = instr.reduce(
  (a, b) => {
    const [type, act, where] = b.split(" ");
    if ((type === "$" && act === "ls") || type === "dir") {
      return a;
    }

    if (type === "$" && act === "cd") {
      switch (where) {
        case "/":
          a.latest = ["root"];
          break;
        case "..":
          a.latest.pop();
          break;
        default:
          a.latest.push(where);
          break;
      }
    } else {
      a.latest.forEach((dir, i) => {
        const uniqueId = a.latest.slice(0, i + 1).join("");
        a[uniqueId] = (a[uniqueId] ?? 0) + +type;
      });
    }

    return a;
  },
  { latest: ["root"] }
);

dirs.latest = 0;

console.log(
  Object.values(dirs)
    .filter((a) => a <= 100000)
    .reduce((a, b) => a + b, 0)
);

// Part Two
const used = dirs.root;
const requiredDelete = 30000000 - (70000000 - used);
console.log(
  Math.min(...Object.values(dirs).filter((a) => a >= requiredDelete))
);
