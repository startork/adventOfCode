var allBags = {};

const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\n");

lines.forEach((line) => {
  var [bag, bags] = line.split(" bags contain ");
  var bagsObject = {};
  bags.split(", ").forEach((bagsbag) => {
    bagsbag = bagsbag.replace(/( bags.| bag.| bags| bag)/g, "");
    var fart = bagsbag.split(" ");
    const amount = fart.shift();
    bagsObject[fart.join(" ")] = parseInt(amount);
  });
  allBags[bag] = bagsObject;
});

var withGold = Object.keys(allBags).filter((name) =>
  calculateGold(allBags[name])
);

console.log("Part 1: " + withGold.length);
console.log("Part 2: " + calculateBags(allBags["shiny gold"]));

function calculateGold(object) {
  return Object.keys(object).some((name) => {
    if (name === "shiny gold") {
      return true;
    } else if (name === "other") {
      return false;
    } else {
      return calculateGold(allBags[name]);
    }
  });
}

function calculateBags(object) {
  return Object.keys(object)
    .map((name) => {
      if (name === "other") {
        return 0;
      } else {
        return object[name] + object[name] * calculateBags(allBags[name]);
      }
    })
    .reduce((a, b) => a + b, 0);
}
