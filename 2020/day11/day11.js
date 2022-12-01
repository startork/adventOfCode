const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const rows = text.split("\n");

function updateSeats(grid) {
  let newGrid = [...grid].map((el) => el.split(""));
  let empty = 0;
  let taken = 0;
  let changes = 0;
  const yLimit = grid.length;
  const xLimit = grid[0].length;
  for (let y = 0; y < yLimit; y++) {
    for (let x = 0; x < xLimit; x++) {
      const seat = grid[y][x];
      if (seat === ".") {
        continue;
      }

      const a = x + 1 < xLimit;
      const b = x - 1 >= 0;
      const c = y + 1 < yLimit;
      const d = y - 1 >= 0;
      const seats = [
        a ? grid[y][x + 1] : 0,
        b ? grid[y][x - 1] : 0,
        c ? grid[y + 1][x] : 0,
        d ? grid[y - 1][x] : 0,
        c && a ? grid[y + 1][x + 1] : 0,
        d && a ? grid[y - 1][x + 1] : 0,
        c && b ? grid[y + 1][x - 1] : 0,
        d && b ? grid[y - 1][x - 1] : 0,
      ];
      takenAdj = seats.filter((seatHere) => seatHere === "#").length;

      if (seat === "#") {
        if (takenAdj >= 4) {
          newGrid[y][x] = "L";
          empty++;
          changes++;
        } else {
          taken++;
        }
      } else if (seat === "L") {
        if (takenAdj === 0) {
          newGrid[y][x] = "#";
          taken++;
          changes++;
        } else {
          empty++;
        }
      }
    }
  }
  return [newGrid.map((el) => el.join("")), empty, taken, changes];
}

let newPlan = [rows.slice(0), 0, 0, 1];

while (newPlan[3] > 0) {
  newPlan = updateSeats(newPlan[0]);
}
// step one
console.log("Part 1: " + newPlan[2]);

function updateSeatsStepTwo(grid) {
  let newGrid = [...grid].map((el) => el.split(""));
  let empty = 0;
  let taken = 0;
  let changes = 0;
  const yLimit = grid.length;
  const xLimit = grid[0].length;
  for (let y = 0; y < yLimit; y++) {
    for (let x = 0; x < xLimit; x++) {
      const seat = grid[y][x];
      if (seat === ".") {
        continue;
      }

      const directions = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ];

      let seatsTaken = 0;
      directions.forEach((direction) => {
        let index = 1;
        let seatTaken = null;
        while (seatTaken === null) {
          yIndex = y + index * direction[0];
          xIndex = x + index * direction[1];
          if (
            yIndex < 0 ||
            yIndex >= yLimit ||
            xIndex < 0 ||
            xIndex >= xLimit
          ) {
            seatTaken = 0;
            break;
          }

          switch (grid[yIndex][xIndex]) {
            case ".":
              index++;
              break;
            case "#":
              seatTaken = 1;
              break;
            case "L":
              seatTaken = 0;
              break;
          }
        }

        seatsTaken += seatTaken;
      });

      if (seat === "#") {
        if (seatsTaken >= 5) {
          newGrid[y][x] = "L";
          empty++;
          changes++;
        } else {
          taken++;
        }
      } else if (seat === "L") {
        if (seatsTaken === 0) {
          newGrid[y][x] = "#";
          taken++;
          changes++;
        } else {
          empty++;
        }
      }
    }
  }
  return [newGrid.map((el) => el.join("")), empty, taken, changes];
}

let newPlanTwo = [rows.slice(0), 0, 0, 1];

while (newPlanTwo[3] > 0) {
  newPlanTwo = updateSeatsStepTwo(newPlanTwo[0]);
}
// step one
console.log("Part 2: " + newPlanTwo[2]);
