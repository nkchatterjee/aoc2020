const fs = require('fs');
const tiles = fs.readFileSync('input.txt', {encoding: 'utf-8'}).split('\n\n').map(tile => {
  const t = tile.split('\n');
  const id = parseInt(/\d+/.exec(t[0])[0]);
  t.shift();
  return {
    id,
    tile: t, 
    edges: extractEdges(t),
    matches: []
  }
});

function reverseString(str) {
  return str.split('').reverse().join('');
}

function extractEdges(tile) {
  const result = [tile[0], tile[tile.length - 1], tile.map(x => x[0]).join``, tile.map(x => x[x.length - 1]).join``];
  return result.concat(result.map(edge => reverseString(edge)));
}

function matchingTiles(tile1, tile2) {
  for (let i = 0; i < tile1.edges.length; i++) {
    const edge1 = tile1.edges[i];
    for (let j = 0; j < tile2.edges.length; j++) {
      const edge2 = tile2.edges[j];
      if (edge1 === edge2) {
        return edge1;
      }
    }
  }
  return null;
}

for (let i = 0; i < tiles.length; i++) {
  const tile1 = tiles[i];
  for (let j = i + 1; j < tiles.length; j++) {
    const tile2 = tiles[j];
    const match = matchingTiles(tile1, tile2);
    if (match) {
      tile1.matches.push({
        id: tile2.id,
        edge: match
      });
      tile2.matches.push({
        id: tile1.id,
        edge: match
      })
    }
    
  }
}

const idsPart1 = tiles.filter(x => x.matches.length == 2).map(x => x.id);

console.log(idsPart1);
console.log(eval(idsPart1.join`*`));