const isLetter = c => /[A-Z]/.test(c)

module.exports = input => {
  let grid = input.split('\r\n');
  let start = grid[0].indexOf('|');
  
  let [dx, dy] = [0, 1];
  let [x, y] = [start, 0];
    
  let steps = 0;
  
  while (true) {
    steps++;
    
    x += dx;
    y += dy;
    
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length || grid[y][x] == ' ') {
      break;
    }
    
    let current = grid[y][x];
    
    if (current == '+') {
      if (dx != 0) {
        if (grid[y + 1] && (grid[y + 1][x] == '|' || isLetter(grid[y + 1][x]))) {
          [dx, dy] = [0, 1];
        } else {
          [dx, dy] = [0, -1];
        }
      } else {
        if (grid[y][x + 1] == '-' || isLetter(grid[y][x + 1])) {
          [dx, dy] = [1, 0];
        } else {
          [dx, dy] = [-1, 0];
        }
      }
    }
  }

  return steps;
}