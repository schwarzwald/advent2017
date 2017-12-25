const cellToCoords = (cell) => {
  if (cell == 1) {
    return [0, 0];
  }

  let root = Math.ceil(Math.sqrt(cell));
  let size = root & 1 ? root: root + 1;

  let index = cell - Math.pow(size - 2, 2) - 1;
  let offset = index % (size - 1);

  let d1 = offset - (size - 1) / 2 + 1;
  let d2 = (size - 1) / 2;

  let segment = Math.floor(index / (size - 1));

  switch (segment) {
    case 0: return [d2, d1];
    case 1: return [-d1, d2];
    case 2: return [-d2, -d1];
    case 3: return [d1, -d2];
  }
}

const coordsToCell = (x, y) => {
  let size = Math.max(Math.abs(x), Math.abs(y))*2 + 1;
  let offset = Math.pow(size - 2, 2) + (size - 1) / 2;

  return (x*x >= y*y && x != -y)?
    offset + ((x > 0)? y: (size - 1)*2 - y):
    offset + ((y > 0)? size - 1 - x: (size - 1)*3 + x);
}

const sumNeighbors = (cell, cache) => {
  if (cell == 1) {
    return 1;
  }

  cache = cache || new Map();

  let sum = 0;
  let [x, y] = cellToCoords(cell);

  [-1, 0, 1].forEach(dx => {
    [-1, 0, 1].forEach(dy => {
      if (dx != 0 || dy != 0) {
        let neighbor = coordsToCell(x + dx, y + dy);
        if (neighbor < cell) {
          sum += cache.get(neighbor) || sumNeighbors(neighbor, cache);
        }
      }
    })
  });

  cache.set(cell, sum);

  return sum;
}

module.exports = input => {
  let result = 0;
  for(let i=1; input >= result; i++) {
    result = sumNeighbors(i);
  }

  return result;
}