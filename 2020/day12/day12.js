const fs = require("fs");
const text = fs.readFileSync("input.txt", { encoding: "utf-8" });
const directions = [
  [1, 0], // East
  [0, -1], // South
  [-1, 0], // West
  [0, 1], // North
];

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.facing = 0;
  }

  updatePosition(direction, amount) {
    let coords;
    switch (direction) {
      case "F":
        coords = directions[this.facing];
        break;
      case "E":
        coords = directions[0];
        break;
      case "S":
        coords = directions[1];
        break;
      case "W":
        coords = directions[2];
        break;
      case "N":
        coords = directions[3];
        break;
    }
    this.x += coords[0] * amount;
    this.y += coords[1] * amount;
  }

  turnDirection(degrees) {
    this.facing = (((this.facing + degrees / 90) % 4) + 4) % 4;
  }

  distance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

const instructions = text.match(/^(.){1}([0-9]+)$/gm);
let position = new Position(0, 0);
instructions.forEach((instr) => {
  const dir = instr.charAt(0);
  const amount = parseInt(instr.substring(1));
  switch (dir) {
    case "L":
      position.turnDirection(-amount);
      break;
    case "R":
      position.turnDirection(amount);
      break;
    default:
      position.updatePosition(dir, amount);
  }
});

// Step one
console.log("Part 1: " + position.distance());

class PositionTwo {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.waypointX = 10;
    this.waypointY = 1;
  }

  moveWaypoint(direction, amount) {
    let coords = [0, 0];
    switch (direction) {
      case "E":
        coords = directions[0];
        break;
      case "S":
        coords = directions[1];
        break;
      case "W":
        coords = directions[2];
        break;
      case "N":
        coords = directions[3];
        break;
    }
    this.waypointX += coords[0] * amount;
    this.waypointY += coords[1] * amount;
  }

  updatePosition(amount) {
    this.x += amount * this.waypointX;
    this.y += amount * this.waypointY;
  }

  rotateWaypoint(degrees) {
    const numOfRotations = (((degrees / 90) % 4) + 4) % 4;
    switch (numOfRotations) {
      case 1:
        const newY = -this.waypointX;
        this.waypointX = this.waypointY;
        this.waypointY = newY;
        break;
      case 2:
        this.waypointX = -this.waypointX;
        this.waypointY = -this.waypointY;
        break;
      case 3:
        const newX = -this.waypointY;
        this.waypointY = this.waypointX;
        this.waypointX = newX;
        break;
    }
  }

  distance() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
}

let positionTwo = new PositionTwo(0, 0);
instructions.forEach((instr) => {
  const dir = instr.charAt(0);
  const amount = parseInt(instr.substring(1));
  switch (dir) {
    case "L":
      positionTwo.rotateWaypoint(-amount);
      break;
    case "R":
      positionTwo.rotateWaypoint(amount);
      break;
    case "F":
      positionTwo.updatePosition(amount);
      break;
    default:
      positionTwo.moveWaypoint(dir, amount);
  }
});

// Step Two
console.log("Part 2: " + positionTwo.distance());
