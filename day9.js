function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      const lines = this.result.split("\r\n").map((line) => parseInt(line));
      var failIndex = 0;
      for (i = 25; i < lines.length; i++) {
        const possibleSums = [];
        for (index = i - 25; index < i - 1; index++) {
          for (p = index + 1; p < i; p++) {
            possibleSums.push(lines[index] + lines[p]);
          }
        }
        if (!possibleSums.includes(lines[i])) {
          // step one
          console.log(lines[i]);
          failIndex = i;
          break;
        }
      }

      const possibleList = lines.slice(failIndex - 25, failIndex);
      const result = loop([], possibleList, lines[failIndex]);
      console.log(result);
    };

    fr.readAsText(this.files[0]);
  });
}

function loop(i, list, goal) {
  for (index = 0; index < list.length; index++) {
    if (!i.includes(index)) {
      i.push(index);
      if (list[index] + loop(i, list, goal) === goal) {
        return list[index];
      }
    }
  }
}
