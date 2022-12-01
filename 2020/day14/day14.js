const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

let mem = [];
let mask = [];
lines.forEach((line) => {
  const [instr, value] = line.split(" = ");
  if (instr === "mask") {
    mask = value.split("");
  } else {
    const binaryNumber = parseInt(value).toString(2);
    const gap = mask.length - binaryNumber.length;
    const binary = mask.map((el, i) => {
      if (el === "X") {
        if (i - gap >= 0) {
          return binaryNumber[i - gap];
        } else {
          return "0";
        }
      } else {
        return el;
      }
    });

    eval(instr + " = " + parseInt(binary.join(""), 2));
  }
});

// Step One
console.log("Part 1: " + mem.reduce((a, b) => a + b, 0));

mem = {};
mask = [];
let addresses = [];
lines.forEach((line) => {
  const [instr, value] = line.split(" = ");
  if (instr === "mask") {
    mask = value.split("");
  } else {
    addresses = [];
    const binaryNumber = parseInt(instr.match(/[0-9]+/g)).toString(2);
    const gap = mask.length - binaryNumber.length;
    const binary = mask.map((el, i) => {
      if (el === "0") {
        if (i - gap >= 0) {
          return binaryNumber[i - gap];
        } else {
          return "0";
        }
      } else {
        return el;
      }
    });
    splitX(binary, 0);
    addresses.forEach((address) => {
      index = address.join("");
      mem[index] = parseInt(value);
    });
  }
});

function splitX(maskToSplit, index) {
  if (index >= maskToSplit.length) {
    addresses.push(maskToSplit);
  } else if (maskToSplit[index] === "X") {
    const zeroMask = maskToSplit.slice(0);
    const oneMask = maskToSplit.slice(0);
    zeroMask[index] = "0";
    oneMask[index] = "1";
    splitX(zeroMask, index + 1);
    splitX(oneMask, index + 1);
  } else {
    splitX(maskToSplit, index + 1);
  }
}

// Step Two
console.log("Part 2: " + Object.values(mem).reduce((a, b) => a + b, 0));
