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
          bagsbag = bagsbag.replace(/( bags| bag)/g, "");
          var fart = bagsbag.split(" ");
          bagsObject[fart.shift()] = fart.join(" ");
        });
        allBags[bag] = bagsObject;
      });

      var fun = Object.keys(allBags).filter((obj) =>
        containsGold(allBags[obj])
      );
      console.log(Object.keys(allBags).length);
      console.log(fun.length);
    };

    fr.readAsText(this.files[0]);
  });
}

function containsGold(object) {
  if (!object) {
    return false;
  } else if (Object.values(object).includes("shiny gold")) {
    return true;
  } else {
    return Object.values(object).some((el) => {
      return containsGold(allBags[el]);
    });
  }
}
