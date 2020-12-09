var lines = [];
var newLines = [];

function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      lines = this.result.split("\r\n");
      newLines = lines.slice(0);
      // part one
      results = runLoop();
      console.log(results[1]);

      for (i = 0; i < results[2].length; i++) {
        newLines = lines.slice(0);
        index = results[2][i];
        const [inst, amount] = newLines[index].split(" ");
        switch (inst) {
          case "acc":
            break;
          case "nop":
            newLines[index] = "jmp " + amount;
            break;
          case "jmp":
            newLines[index] = "nop " + amount;
            break;
        }
        if (!(inst === "acc") && !runLoop()[0]) {
          break;
        }
      }
      // part two
      console.log(runLoop()[1]);
    };

    fr.readAsText(this.files[0]);
  });
}

function runLoop() {
  var completed = [];
  var acc = 0;
  var index = 0;
  while (!completed.includes(index) && index < newLines.length) {
    completed.push(index);
    const [instr, amount] = newLines[index].split(" ");
    switch (instr) {
      case "jmp":
        index = index + eval(amount);
        break;
      case "acc":
        acc = acc + eval(amount);
      case "nop":
        index++;
        break;
    }
  }
  return [completed.includes(index), acc, completed];
}
