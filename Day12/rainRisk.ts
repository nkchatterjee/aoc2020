const fs = require('fs')
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n')

// part 1
const compass = {
  0: "N",
  90: "E",
  180: "S",
  270: "W",
};
class Ship {
  protected _degrees: keyof typeof compass;
  protected _position: [x: number, y: number];

  public constructor() {
    this._degrees = 90;
    this._position = [0, 0];
  }

  public move(direction: string, value: number) {
    switch (direction) {
      case "N":
        this._position[1] += value;
        break;
      case "E":
        this._position[0] += value;
        break;
      case "S":
        this._position[1] -= value;
        break;
      case "W":
        this._position[0] -= value;
        break;
      case "F":
        this.move(compass[this._degrees], value);
        break;
      case "L":
        this._degrees -= value;
        if (this._degrees < 0) this._degrees += 360;
        break;
      case "R":
        this._degrees += value;
        if (this._degrees >= 360) this._degrees -= 360;
        break;
    }
  }

  public get position(): [x: number, y: number] {
    return [...this._position];
  }
}
const ship = new Ship();

lines.forEach((line) => {
  const action = line.substr(0, 1);
  const value = parseInt(line.substr(1));
  ship.move(action, value);
});

const [x, y] = ship.position;
console.log(Math.abs(x) + Math.abs(y));

// part 2
class BetterShip {
  protected _position: [x: number, y: number];
  protected _waypoint: [x: number, y: number];

  public constructor() {
    this._position = [0, 0];
    this._waypoint = [10, 1];
  }

  public move(direction: string, value: number) {
    switch (direction) {
      case "N":
        this._waypoint[1] += value;
        break;
      case "E":
        this._waypoint[0] += value;
        break;
      case "S":
        this._waypoint[1] -= value;
        break;
      case "W":
        this._waypoint[0] -= value;
        break;
      case "F":
        this._position[0] += this._waypoint[0] * value;
        this._position[1] += this._waypoint[1] * value;
        break;
      case "L":
        switch (value) {
          case 90:
            this._waypoint.reverse();
            this._waypoint[0] *= -1;
            break;
          case 180:
            this._waypoint[0] *= -1;
            this._waypoint[1] *= -1;
            break;
          case 270:
            this._waypoint.reverse();
            this._waypoint[1] *= -1;
            break;
        }
        break;
      case "R":
        switch (value) {
          case 90:
            this._waypoint.reverse();
            this._waypoint[1] *= -1;
            break;
          case 180:
            this._waypoint[0] *= -1;
            this._waypoint[1] *= -1;
            break;
          case 270:
            this._waypoint.reverse();
            this._waypoint[0] *= -1;
            break;
        }
        break;
    }
  }

  public get position(): [x: number, y: number] {
    return [...this._position];
  }
}
const betterShip = new BetterShip();

lines.forEach((line) => {
  const action = line.substr(0, 1);
  const value = parseInt(line.substr(1));
  betterShip.move(action, value);
});

// const [x, y] = betterShip.position;
// console.log(Math.abs(x) + Math.abs(y));