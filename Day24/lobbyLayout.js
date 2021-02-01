const fs = require('fs');
const lines = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n');

function coordinatesToID(x, y) {
  return x + '#' + y;
}

const directionToDelta = {
  'nw': {dx: 0, dy: -1},
  'ne': {dx: 1, dy: -1},
  'w': {dx: -1, dy: 0},
  'e': {dx: 1, dy: 0},
  'sw': {dx: -1, dy: 1},
  'se': {dx: 0, dy: 1}
};

let blackTiles = new Set();

let x, y;

for (const line of lines) {
  x = 0;
  y = 0;
  const directions = [...line.matchAll(/e|se|sw|w|nw|ne/g)].map(x => x[0]);

  for (const direction of directions) {
    x += directionToDelta[direction].dx; 
    y += directionToDelta[direction].dy;
  }

  const key = coordinatesToID(x, y);
  if (blackTiles.has(key)) {
    blackTiles.delete(key);
  } else {
    blackTiles.add(key);
  }
}

console.log(blackTiles.size);

// part 2 

function getNeighbors(x, y) {
  const result = [];

  for (const direction in directionToDelta) {
    result.push({
      x: x+directionToDelta[direction].dx,
      y: y+directionToDelta[direction].dy
    })
  }

  return result;
}

for (let i = 1; i <= 100; i++) {
  newBlackTiles = new Set();

  const tiles = blackTiles.keys();
  for (const tile of tiles) {
    const [x, y] = tile.split('#').map(x => parseInt(x));
    const cellsAround = getNeighbors(x, y);
    cellsAround.push({x, y}) // add the current cell

    for (const cell of cellsAround) {
      const currentId = coordinatesToID(cell.x, cell.y);
      const neighbors = getNeighbors(cell.x, cell.y);
      const totalBlackNeighbors = neighbors.filter(n => blackTiles.has(coordinatesToID(n.x, n.y))).length;

      if (blackTiles.has(currentId)) {
        if (totalBlackNeighbors === 0 || totalBlackNeighbors > 2) {
          newBlackTiles.delete(currentId) // line isn't needed
        } else {
          newBlackTiles.add(currentId)
        }
      } else {
        if (totalBlackNeighbors == 2) {
          newBlackTiles.add(currentId);
        }
      }
    }
  }
  blackTiles = newBlackTiles;
  console.log(blackTiles.size);
}