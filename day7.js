function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      var lines = this.result.split("\r\n");
      var allBags = {};
      lines.forEach((line) => {
        var [bag, bags] = line.split(" bags contain ");
        var bagsObject = {};
        bags.split(", ").forEach((bagsbag) => {
          bagsbag = bagsbag.replace(/( bags.| bag.| bags| bag)/g, "");
          var fart = bagsbag.split(" ");
          bagsObject[fart.shift()] = fart.join(" ");
        });
        allBags[bag] = bagsObject;
      });

      var fun = Object.keys(allBags).filter((obj) =>
        containsGold(allBags[obj], allBags)
      );
      console.log(fun.length);
    };

    fr.readAsText(this.files[0]);
  });
}

function containsGold(object, happyBags) {
  if (!object) {
    return false;
  } else if (Object.values(object).includes("shiny gold")) {
    return true;
  } else {
    return Object.values(object).some((el) => {
      return containsGold(happyBags[el], happyBags);
    });
  }
}
