const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\r\n");

// let mem = [];
// let mask = [];
// lines.forEach((line) => {
//   const [instr, value] = line.split(" = ");
//   if (instr === "mask") {
//     mask = value.split("");
//   } else {
//     const binaryNumber = parseInt(value).toString(2);
//     const gap = mask.length - binaryNumber.length;
//     const binary = mask.map((el, i) => {
//       if (el === "X") {
//         if (i - gap >= 0) {
//           return binaryNumber[i - gap];
//         } else {
//           return "0";
//         }
//       } else {
//         return el;
//       }
//     });

//     eval(instr + " = " + parseInt(binary.join(""), 2));
//   }
// });

// // Step One
// console.log(mem.reduce((a, b) => a + b, 0));

let mem = [];
let addresses = [];
lines.forEach((line) => {
  const [instr, value] = line.split(" = ");
  if (instr === "mask") {
    const mask = value.split("");
    addresses = console.log(splitX(mask, 0));
    console.log(addresses);
  } else {
    // const binaryNumber = parseInt(value).toString(2);
    // const gap = mask.length - binaryNumber.length;
    // const binary = mask.map((el, i) => {
    //   if (el === "X") {
    //     if (i - gap >= 0) {
    //       return binaryNumber[i - gap];
    //     } else {
    //       return "0";
    //     }
    //   } else {
    //     return el;
    //   }
    // });
    // eval(instr + " = " + parseInt(binary.join(""), 2));
  }
});

function splitX(maskToSplit, index) {
  if (index >= maskToSplit.length) {
    return maskToSplit;
  } else if (maskToSplit[index] === "X") {
    const zeroMask = maskToSplit.slice(0);
    const oneMask = maskToSplit.slice(0);
    zeroMask[index] = "0";
    oneMask[index] = "1";
    return [splitX(zeroMask, index + 1)].push(splitX(oneMask, index + 1));
  } else {
    return splitX(maskToSplit, index + 1);
  }
}

// Step Two
// console.log(mem.reduce((a, b) => a + b, 0));
