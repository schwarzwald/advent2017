module.exports = input => {
  let cycles = size = 10000000;
  let [dx, dy] = [0, -1];
  let position = 0;
  let totalInfected = 0;

  let infected = new Set();
  let weakened = new Set();
  let flagged = new Set();

  input.split('\r\n').forEach((row, y) =>
    [...row].forEach((cell, x) =>
      (cell == '#')? infected.add((y - ((row.length - 1) / 2)) * size + x - (row.length - 1) / 2): 0));

  while (cycles--) {
    if (infected.has(position)) {
      [dx, dy] = [-dy, dx];
      infected.delete(position);
      flagged.add(position);
    } else if (weakened.has(position)){
      weakened.delete(position);
      infected.add(position);
      totalInfected++;
    } else if (flagged.has(position)) {
      [dx, dy] = [-dx, -dy];
      flagged.delete(position);
    } else {
      [dx, dy] = [dy, -dx];
      weakened.add(position);
    }
    
    position += dy * size + dx;
  }

  return totalInfected;
}