function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      const map = this.result.split("\n");
      const width = map[0].length;
      let [x, y] = [0, 0];
      let trees = 0;
      while (y < map.length) {
        if (map[y].charAt(x) === "#") {
          trees++;
        }
        y = y + down;
        x = (x + right) % width;
      }
      document.getElementById("demo").textContent = trees;
    };
    fr.readAsText(this.files[0]);
  });
}
