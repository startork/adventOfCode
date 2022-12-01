const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
var lines = text.split("\n");
lines = lines.map((el) => {
  if (el.length <= 1) {
    return "&&";
  } else {
    return el;
  }
});

var fatString = lines.join(" ");
var validPassports = 0;
var newList = fatString.split("&&");
var requiredItems = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

newList.forEach((pass) => {
  if (requiredItems.every((item) => pass.includes(item))) {
    var props = pass.split(" ");
    var byr = props
      .find((prop) => prop.includes("byr"))
      .split(":")[1]
      .trim();
    var iyr = props
      .find((prop) => prop.includes("iyr"))
      .split(":")[1]
      .trim();
    var eyr = props
      .find((prop) => prop.includes("eyr"))
      .split(":")[1]
      .trim();
    var hgt = props
      .find((prop) => prop.includes("hgt"))
      .split(":")[1]
      .trim();
    var hcl = props
      .find((prop) => prop.includes("hcl"))
      .split(":")[1]
      .trim();
    var ecl = props
      .find((prop) => prop.includes("ecl"))
      .split(":")[1]
      .trim();
    var pid = props
      .find((prop) => prop.includes("pid"))
      .split(":")[1]
      .trim();
    var success = true;

    success =
      success &&
      byr.length === 4 &&
      parseInt(byr) <= 2002 &&
      parseInt(byr) >= 1920;
    success =
      success &&
      iyr.length === 4 &&
      parseInt(iyr) <= 2020 &&
      parseInt(iyr) >= 2010;
    success =
      success &&
      eyr.length === 4 &&
      parseInt(eyr) <= 2030 &&
      parseInt(eyr) >= 2020;
    var heightType = hgt.substring(hgt.length - 2);
    if (["cm", "in"].includes(heightType)) {
      var height = parseInt(hgt.substring(0, hgt.length - 2));
      if (heightType === "cm") {
        success = success && height <= 193 && height >= 150;
      } else {
        success = success && height <= 76 && height >= 59;
      }
    } else {
      success = false;
    }
    var hairRegex = new RegExp("^[a-f0-9]{6}$");
    if (hcl.charAt(0) === "#") {
      success = success && hairRegex.test(hcl.substring(1));
    } else {
      success = false;
    }

    var eyeRegex = new RegExp("^(amb|blu|brn|gry|grn|hzl|oth){1}$");
    success = success && eyeRegex.test(ecl);
    var psprtRegex = new RegExp("^[0-9]{9}$");
    success = success && psprtRegex.test(pid);

    if (success) {
      validPassports++;
    }
  }
});

partOnePassports = newList.filter((pass) =>
  requiredItems.every((item) => pass.includes(item))
).length;

console.log("Part 1: " + partOnePassports);

console.log("part 2: " + validPassports);
