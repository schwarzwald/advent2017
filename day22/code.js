module.exports = input => {
  let cycles = size = 10000;
  let [dx, dy] = [0, -1];
  let position = 0;
  let totalInfected = 0;
  let infected = new Set();

  input.split('\r\n').forEach((row, y) =>
    [...row].forEach((cell, x) =>
      (cell == '#')? infected.add((y - ((row.length - 1) / 2)) * size + x - (row.length - 1) / 2): 0));

  while (cycles--) {
    if (infected.has(position)) {
      [dx, dy] = [-dy, dx];
      infected.delete(position);
    } else {
      [dx, dy] = [dy, -dx];
      infected.add(position);
      totalInfected++;
    }

    position += dy * size + dx;
  }

  return totalInfected;
}