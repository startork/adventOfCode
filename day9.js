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

      const possibleList = lines.slice(0, failIndex);
      const goal = lines[failIndex];
      var conNumbers = []
      for (i = 0; i < possibleList.length; i++) {
        const yaBoi = possibleList.slice(i);
        var amount = 0;
        for (p = 0; p < yaBoi.length; p++) {
          amount += yaBoi[p];
          if (amount === goal) {
            conNumbers = yaBoi.slice(0, p + 1);
            break;
          } else if (amount > goal) {
            break;
          }
        }
        if (conNumbers.length) {
          break;
        }
      }

      console.log(Math.max(...conNumbers) + Math.min(...conNumbers));
    };

    fr.readAsText(this.files[0]);
  });
}