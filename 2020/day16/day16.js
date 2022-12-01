const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

const ruleNumbers = lines
  .slice(0, 20)
  .join("\n")
  .match(/([0-9]+)/g);

const rules = ruleNumbers
  .map((el, i) => {
    if (i % 4 === 0) {
      return (
        "ruleInput >= " +
        el +
        " && " +
        ruleNumbers[i + 1] +
        " >= ruleInput || ruleInput >= " +
        ruleNumbers[i + 2] +
        " && " +
        ruleNumbers[i + 3] +
        " >= ruleInput"
      );
    }
  })
  .filter((x) => x);

const nearbyIndex = lines.findIndex((x) => x === "nearby tickets:");
const nearbyTickets = lines.slice(nearbyIndex + 1);
const numbers = nearbyTickets.join(",").split(",");

const naughtyNumbers = numbers.filter((ruleInput) => {
  return !rules.some((rule) => {
    return eval(rule);
  });
});

// Step One
console.log("Part 1: " + naughtyNumbers.reduce((a, b) => a + parseInt(b), 0));

const validTickets = nearbyTickets
  .map((x) => x.split(","))
  .filter((ticket) =>
    ticket.every((ruleInput) => rules.some((rule) => eval(rule)))
  );

locationObject = {};
for (i = 0; i < validTickets[0].length; i++) {
  const ruleIndex = rules
    .filter((rule) =>
      validTickets.every((ticket) => {
        const ruleInput = ticket[i];
        return eval(rule);
      })
    )
    .map((x) => rules.findIndex((r) => r === x));
  locationObject[i] = ruleIndex;
}
let newObject = {};
while (Object.keys(locationObject).length > 0) {
  const values = Object.keys(locationObject).filter(
    (r) => locationObject[r].length === 1
  );
  let numbers = [];
  values.forEach((x) => {
    const newValue = locationObject[x][0];
    numbers.push(newValue);
    newObject[newValue] = x;
    delete locationObject[x];
    Object.keys(locationObject).forEach((x) => {
      locationObject[x] = locationObject[x].filter((t) => t !== newValue);
    });
  });
}

const myTicket =
  "157,101,107,179,181,163,191,109,97,103,89,113,167,127,151,53,83,61,59,173".split(
    ","
  );

const correct = [16, 3, 11, 17, 4, 5];
let list = [];
correct.forEach((x) => {
  list.push(parseInt(myTicket[x]));
});

console.log("Part 2: " + list.reduce((a, b) => a * b, 1));
