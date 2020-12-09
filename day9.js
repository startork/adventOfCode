function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      const lines = this.result.split("\r\n").map((line) => parseInt(line));
      for (i = 25; i < lines.length; i++) {
        const possibleSums = [];
        for (index = i - 25; index < i - 1; index++) {
          for (p = index + 1; p < i; p++) {
            possibleSums.push(lines[index] + lines[p]);
          }
        }
        if (!possibleSums.includes(lines[i])) {
          console.log(lines[i]);
          break;
        }
      }
    };

    fr.readAsText(this.files[0]);
  });
}
