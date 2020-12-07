function runFunction() {
  document.getElementById("inputText").addEventListener("change", function () {
    var fr = new FileReader();
    fr.onload = function () {
      const map = this.result.split("\r\n");
      
      // Step One
      console.log(getTrees(map, 3, 1));

      // Step Two 
      const total = 
        getTrees(map, 1, 1) *
        getTrees(map, 3, 1) *
        getTrees(map, 5, 1) *
        getTrees(map, 7, 1) *
        getTrees(map, 1, 2)

      console.log(total);
    };
    fr.readAsText(this.files[0]);
  });
}

function getTrees(map, right, down) {
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
  return trees;
}