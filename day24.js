const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\r\n");

class Hex {
  constructor(
    north,
    east,
    black,
    se = null,
    sw = null,
    nw = null,
    ne = null,
    e = null,
    w = null
  ) {
    if (north === null) {
      this.north = nw + ne - (sw + se);
      this.east = 2 * (e - w) + (ne + se) - (nw + sw);
    } else {
      this.north = north;
      this.east = east;
    }
    this.black = black === null ? true : black; // true = black
  }

  numOfBlack() {
    return hexes
      .filter((hex) =>
        this.buildAdjacent().some((coord) => hex.match(...coord))
      )
      .filter((hex) => hex.black).length;
  }

  positionEqual(hex) {
    return this.north === hex.north && this.east === hex.east;
  }

  match(north, east) {
    return this.north === north && this.east === east;
  }

  buildAdjacent() {
    return [
      [this.north + 1, this.east + 1],
      [this.north + 1, this.east - 1],
      [this.north - 1, this.east + 1],
      [this.north - 1, this.east - 1],
      [this.north, this.east - 2],
      [this.north, this.east + 2],
    ];
  }

  flip() {
    this.black = !this.black;
  }
}

let hexes = [];

lines.forEach((line) => {
  const directions = ["se", "sw", "nw", "ne", "e", "w"].map((dir) => {
    const length = line.length;
    line = line.split(dir).join("");
    return (length - line.length) / dir.length;
  });

  const hex = new Hex(null, null, null, ...directions);
  const existing = hexes.find((x) => x.positionEqual(hex));

  if (existing) {
    existing.flip();
  } else {
    hexes.push(hex);
  }
});

const blackTiles = hexes.filter((x) => x.black).length;

console.log(blackTiles);

function fillSpace() {
  hexes.forEach((hex) => {
    if (hex.black) {
      hex.buildAdjacent().forEach((coords) => {
        const match = hexes.find((c) => c.match(...coords));
        if (!match) {
          hexes.push(new Hex(...coords, false));
        }
      });
    }
  });
}

function changeHexes() {
  let newMap = [];
  hexes.forEach((hex) => {
    const num = hex.numOfBlack();
    let black = hex.black;
    if ((black && ![1, 2].includes(num)) || (!black && num === 2)) {
      black = !black;
    }
    newMap.push(new Hex(hex.north, hex.east, black));
  });

  hexes = newMap;
}

for (i = 0; i < 100; i++) {
  fillSpace();
  changeHexes();
}
const numBlack = hexes.filter((hex) => hex.black).length;
console.log(numBlack);
