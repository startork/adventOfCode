const input = [15, 5, 1, 4, 7, 0];
let limit = 30000000;
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

console.log(lastNumber);
