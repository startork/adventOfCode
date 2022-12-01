const input = [15, 5, 1, 4, 7, 0];
let limit = 30000000;

function task(limit) {
  let inputObj = {};
  let lastNumber = 0;
  input.forEach((el, i) => {
    if (i >= input.length - 1) {
      lastNumber = el;
    } else {
      inputObj[el] = i + 1;
    }
  });

  for (i = input.length; i < limit; i++) {
    const existing = inputObj[lastNumber];
    inputObj[lastNumber] = i;
    if (existing) {
      lastNumber = i - existing;
    } else {
      lastNumber = 0;
    }
  }

  return lastNumber;
}

console.log("Part 1: " + task(2020));
console.log("Part 2: " + task(30000000));
