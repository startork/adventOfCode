const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });

const moves = text.split("\r\n");

const followHead = (head, tail, dir) => {
  const htDiff = [head[0] - tail[0], head[1] - tail[1]];
  switch (dir) {
    case "U":
      head[1] += 1;
      if (htDiff[1] > 0) {
        tail[1] += 1;
        tail[0] = head[0];
      }
      break;
    case "R":
      head[0] += 1;
      if (htDiff[0] > 0) {
        tail[0] += 1;
        tail[1] = head[1];
      }
      break;
    case "L":
      head[0] -= 1;
      if (htDiff[0] < 0) {
        tail[0] -= 1;
        tail[1] = head[1];
      }
      break;
    case "D":
      head[1] -= 1;
      if (htDiff[1] < 0) {
        tail[1] -= 1;
        tail[0] = head[0];
      }
      break;
  }
};

// Part One
const result = moves.reduce(
  (a, b) => {
    const [dir, dist] = b.split(" ");
    const head = a.loc.h;
    const tail = a.loc.t;
    for (let index = 0; index < +dist; index++) {
      followHead(head, tail, dir);

      const loc = tail.join(",");
      if (!a.map.includes(loc)) a.map.push(loc);
    }

    return a;
  },
  { loc: { h: [0, 0], t: [0, 0] }, map: ["0,0"] }
);

console.log(result.map.length);

// Part Two
// Basic B*tch Version (Really should use a class but F*ck it)
const followTail = (head, tail) => {
  const htDiff = [head[0] - tail[0], head[1] - tail[1]];
  const move = htDiff.some(a => Math.abs(a) > 1);

  if (!move) return;

  tail[0] += htDiff[0] === 0 ? 0 : htDiff[0] > 0 ? 1 : -1;
  tail[1] += htDiff[1] === 0 ? 0 : htDiff[1] > 0 ? 1 : -1;
};

const resultV2 = moves.reduce(
  (a, b) => {
    const [dir, dist] = b.split(" ");
    for (let index = 0; index < +dist; index++) {
      const h = a.loc.h;
      const h2 = a.loc.h2;
      const h3 = a.loc.h3;
      const h4 = a.loc.h4;
      const h5 = a.loc.h5;
      const h6 = a.loc.h6;
      const h7 = a.loc.h7;
      const h8 = a.loc.h8;
      const h9 = a.loc.h9;
      const t = a.loc.t;

      followHead(h, h2, dir);
      followTail(h2, h3, dir);
      followTail(h3, h4, dir);
      followTail(h4, h5, dir);
      followTail(h5, h6, dir);
      followTail(h6, h7, dir);
      followTail(h7, h8, dir);
      followTail(h8, h9, dir);
      followTail(h9, t, dir);

      const loc = t.join(",");
      if (!a.map.includes(loc)) a.map.push(loc);
    }

    return a;
  },
  {
    loc: {
      h: [0, 0],
      h2: [0, 0],
      h3: [0, 0],
      h4: [0, 0],
      h5: [0, 0],
      h6: [0, 0],
      h7: [0, 0],
      h8: [0, 0],
      h9: [0, 0],
      t: [0, 0],
    },
    map: ["0,0"],
  }
);

console.log(resultV2.map.length);
