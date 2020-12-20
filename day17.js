const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const lines = text.split("\r\n");

class Cube {
  constructor(x, y, z, value) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.value = value;
  }

  match(x, y, z) {
    return this.x === x && this.y === y && this.z === z;
  }

  numOfNext() {
    return cubes
      .filter((cube) => {
        const allowedX = [this.x - 1, this.x, this.x + 1].includes(cube.x);
        const allowedY = [this.y - 1, this.y, this.y + 1].includes(cube.y);
        const allowedZ = [this.z - 1, this.z, this.z + 1].includes(cube.z);
        const equal =
          this.x === cube.x && this.y === cube.y && this.z === cube.z;

        return allowedX && allowedY && allowedZ && !equal;
      })
      .reduce((a, b) => a + b.value, 0);
  }
}

let cubes = [];
lines.forEach((line, x) =>
  line
    .split("")
    .forEach((letter, y) =>
      cubes.push(new Cube(x, y, 0, letter === "#" ? 1 : 0))
    )
);

for (i = 0; i < 6; i++) {
  fillSpace();
  changeMap();
}
const numActive = cubes.filter((cube) => cube.value).length;
console.log(numActive);

function fillSpace() {
  cubes.forEach((cube) => {
    if (cube.value) {
      const Xarray = [cube.x - 1, cube.x, cube.x + 1];
      const Yarray = [cube.y - 1, cube.y, cube.y + 1];
      const Zarray = [cube.z - 1, cube.z, cube.z + 1];
      Xarray.forEach((x) =>
        Yarray.forEach((y) =>
          Zarray.forEach((z) => {
            if (x !== 0 || y !== 0 || z !== 0) {
              const match = cubes.find((c) => c.match(x, y, z));
              if (!match) {
                cubes.push(new Cube(x, y, z, 0));
              }
            }
          })
        )
      );
    }
  });
}

function changeMap() {
  let newMap = [];
  cubes.forEach((cube) => {
    const num = cube.numOfNext();
    let value = cube.value;
    if ((cube.value && ![2, 3].includes(num)) || (!cube.value && num === 3)) {
      value = cube.value === 0 ? 1 : 0;
    }
    newMap.push(new Cube(cube.x, cube.y, cube.z, value));
  });

  cubes = newMap;
}

class CubeFour {
  constructor(x, y, z, w, value) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.value = value;
  }

  match(x, y, z, w) {
    return this.x === x && this.y === y && this.z === z && this.w === w;
  }

  numOfNext() {
    return cubes
      .filter((cube) => {
        const allowedX = [this.x - 1, this.x, this.x + 1].includes(cube.x);
        const allowedY = [this.y - 1, this.y, this.y + 1].includes(cube.y);
        const allowedZ = [this.z - 1, this.z, this.z + 1].includes(cube.z);
        const allowedW = [this.w - 1, this.w, this.w + 1].includes(cube.w);
        const equal =
          this.x === cube.x &&
          this.y === cube.y &&
          this.z === cube.z &&
          this.w === cube.w;

        return allowedX && allowedY && allowedZ && allowedW && !equal;
      })
      .reduce((a, b) => a + b.value, 0);
  }
}

cubes = [];
lines.forEach((line, x) =>
  line
    .split("")
    .forEach((letter, y) =>
      cubes.push(new CubeFour(x, y, 0, 0, letter === "#" ? 1 : 0))
    )
);

for (i = 0; i < 6; i++) {
  fillSpaceFour();
  changeMapFour();
}
const numActiveFour = cubes.filter((cube) => cube.value).length;
console.log(numActiveFour);

function fillSpaceFour() {
  cubes.forEach((cube) => {
    if (cube.value) {
      const Xarray = [cube.x - 1, cube.x, cube.x + 1];
      const Yarray = [cube.y - 1, cube.y, cube.y + 1];
      const Zarray = [cube.z - 1, cube.z, cube.z + 1];
      const Warray = [cube.w - 1, cube.w, cube.w + 1];
      Xarray.forEach((x) =>
        Yarray.forEach((y) =>
          Zarray.forEach((z) =>
            Warray.forEach((w) => {
              if (x !== 0 || y !== 0 || z !== 0 || w !== 0) {
                const match = cubes.find((c) => c.match(x, y, z, w));
                if (!match) {
                  cubes.push(new CubeFour(x, y, z, w, 0));
                }
              }
            })
          )
        )
      );
    }
  });
}

function changeMapFour() {
  let newMap = [];
  cubes.forEach((cube) => {
    const num = cube.numOfNext();
    let value = cube.value;
    if ((cube.value && ![2, 3].includes(num)) || (!cube.value && num === 3)) {
      value = cube.value === 0 ? 1 : 0;
    }
    newMap.push(new CubeFour(cube.x, cube.y, cube.z, cube.w, value));
  });

  cubes = newMap;
}
