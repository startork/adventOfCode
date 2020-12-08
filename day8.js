var lines = [];
var newLines = [];

function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      lines = this.result.split("\r\n");
      newLines = lines.slice(0);
      // part one
      console.log(runLoop()[1]);

      var index = 0;
      while (runLoop()[0]) {
        newLines = lines.slice(0);
        index = changeLine(index);
        index++;
      }

      // part two
      console.log(runLoop()[1]);
    };

    fr.readAsText(this.files[0]);
  });
}

function changeLine(index) {
  const [inst, amount] = newLines[index].split(" ");
  switch (inst) {
    case "acc":
      return changeLine(index + 1);
    case "nop":
      newLines[index] = "jmp " + amount;
      return index;
    case "jmp":
      newLines[index] = "nop " + amount;
      return index;
  }
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
  return [completed.includes(index), acc];
}
