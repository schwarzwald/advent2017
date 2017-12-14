const hash = require('../day10/code_extra');

module.exports = input => {
  let grid = [...new Array(128).keys()].reduce((total, i) => {
    let hashString = hash(`${input}-${i}`);
    return total + [...new Array(8).keys()].reduce((row, j) => row + parseInt(hashString.substring(j * 4, (j + 1) * 4), 16).toString(2).padStart(16, '0'), '');
  }, '');

  let visited = new Set();
  let groups = 0;

  for (let i = 0; i < 128*128; i++) {
    let groupStarted = false;
    let stack = [];

    stack.push(i);

    while (stack.length) {
      let current = stack.pop();
      let x = current % 128;
      let y = (current / 128) | 0;

      if (visited.has(current)) {
        continue;
      }

      visited.add(current);

      if (grid[current] != '1') {
        continue;
      }

      if (!groupStarted) {
        groupStarted = true;
        groups++;
      }

      [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
          if (((dx == 0) ^ (dy == 0)) && (x + dx >= 0 && x + dx <= 127 && y + dy >= 0 && y + dy <= 127)) {
            stack.push(current + dy * 128 + dx);
          }
        });
      });
    }
  }

  return groups;
}