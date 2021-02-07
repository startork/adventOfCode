const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
let [rules, input] = text.split("\r\n\r\n");

ruleObject = {};

const cartesian = (...a) =>
  a.reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())));

rules.split("\r\n").forEach((ruleLine) => {
  let [id, rule] = ruleLine.split(": ");
  ruleObject[id] = rule.split(" | ").map((x) => {
    if (['"a"', '"b"'].includes(x)) {
      return x[1];
    }
    return x.split(" ");
  });
});

function buildRules(locRules) {
  if (["a", "b"].includes(locRules[0])) {
    return locRules;
  }
  let newRules = [];
  locRules.forEach((rule) => {
    let locRule = [];
    rule.forEach((key) => {
      const k = buildRules(ruleObject[key]);
      locRule.push(k);
    });
    if (locRule.length > 1) {
      const options = cartesian(...locRule);
      options.forEach((option) => {
        newRules.push(option.join(""));
      });
    } else {
      newRules.push(...locRule[0]);
    }
  });
  return newRules;
}

let newObject = {};
Object.keys(ruleObject).forEach((key) => {
  newObject[key] = buildRules(ruleObject[key]);
});

const lines = input.split("\r\n");
const results = newObject["0"];
const matches = lines.filter((line) => results.includes(line)).length;

console.log(matches);
