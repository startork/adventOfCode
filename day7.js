var allBags = {};

function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      var lines = this.result.split(".\r\n");
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

      var withGold = Object.keys(allBags).filter((name) => calculateGold(allBags[name]));

      console.log(withGold.length);

      console.log(calculateBags(allBags['shiny gold']));
    };

    fr.readAsText(this.files[0]);
  });
}

function calculateGold(object) {
  return Object.keys(object).some((name) => {
    if (name === 'shiny gold') {
      return true;
    } else if (name === 'other') {
      return false;
    } else {
      return calculateGold(allBags[name]);
    }
  })
}

function calculateBags(object) {
  return Object.keys(object).map((name) => {
    if (name === 'other') {
      return 0;
    } else {
      return object[name] + object[name] * calculateBags(allBags[name]);
    }
  }).reduce((a, b) => a + b, 0);
}
