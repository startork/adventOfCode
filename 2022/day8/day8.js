const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

const map = text.split("\r\n").map((row) => row.split("").map((r) => +r));

// Part One
const visible = map.reduce((vis, row, rowIndex) => {
  const visTrees = row.filter((tree, colIndex) => {
    return (
      row.slice(0, colIndex).every((tr) => tr < tree) ||
      row.slice(colIndex + 1).every((tr) => tr < tree) ||
      map.slice(0, rowIndex).every((r) => r[colIndex] < tree) ||
      map.slice(rowIndex + 1).every((r) => r[colIndex] < tree)
    );
  });

  return vis + visTrees.length;
}, 0);

console.log(visible);

// Part Two
const highScore = map.reduce((hs, row, rowIndex) => {
  const score = row.reduce((sc, tree, colIndex) => {
    function score(arr, height) {
      const loc = arr.findIndex((tr) => tr >= height);
      return loc > -1 ? loc + 1 : arr.length;
    }

    const left = score(row.slice(0, colIndex).reverse(), tree);
    const right = score(row.slice(colIndex + 1), tree);
    const up = score(
      map
        .slice(0, rowIndex)
        .map((r) => r[colIndex])
        .reverse(),
      tree
    );
    const down = score(
      map.slice(rowIndex + 1).map((r) => r[colIndex]),
      tree
    );

    const treeScore = left * right * up * down;

    return treeScore > sc ? treeScore : sc;
  }, 0);

  return score > hs ? score : hs;
}, 0);

console.log(highScore);
