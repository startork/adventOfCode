const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const [time, buses] = text.split("\n", 2);

const timedBuses = buses
  .split(",")
  .filter((el) => el !== "x")
  .map((el) => parseInt(el));

let [min, bus] = [Math.max(...timedBuses), 0];
timedBuses.forEach((timedBus) => {
  const timeToWait = timedBus - (time % timedBus);
  if (timeToWait < min) {
    min = timeToWait;
    bus = timedBus;
  }
});

// Step One
console.log("Part 1: " + min * bus);

const allBuses = buses.split(",");
const busWithTime = {};
allBuses.forEach((el, i) => {
  if (el !== "x") {
    busWithTime[el] = (el - (i % parseInt(el))) % parseInt(el);
  }
});

let i = 1;
let diff = 1;
while (Object.keys(busWithTime).length > 0) {
  Object.keys(busWithTime).forEach((el) => {
    if (i % parseInt(el) === busWithTime[el]) {
      diff = diff * parseInt(el);
      delete busWithTime[el];
    }
  });
  i += diff;
}

// Step Two
console.log("Part 2: " + (i - diff));
