function solvePartOne(x, y, count) {
  if (y >= input.length) return count;

  x = x % input[0].length;

  if (input[y][x] == "#") count++;
  return solvePartOne(x+3, y+1, count);
}

solvePartOne(0, 0, 0);

function solvePartTwo(x, y, count, dx, dy) {
  if (y >= input.length) return count;

  x = x % input[0].length;

  if (input[y][x] == "#") count++;
  return solvePartTwo(x+dx, y+dy, count, dx, dy);
}

dxdy = [[1,1], [3,1], [5,1], [7,1], [1,2]];

dxdy.map(([dx,dy]) => {
    const treeCount = solvePartTwo(0, 0, 0, dx, dy);
    console.log(`dx ${dx} dy ${dy}: ${treeCount}`);
    return treeCount;
}).reduce((a,b) => a*b);