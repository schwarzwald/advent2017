const hash = require('../day10/code_extra');

module.exports = input => {
  let rows = [...new Array(128)].map((a, i) => {
    let hashString = hash(`${input}-${i}`); 
    return [...new Array(8)].reduce((row, c, j) => row + parseInt(hashString.substring(j * 4, (j + 1) * 4), 16).toString(2).padStart(16, '0'), '');
  });

  let visited = [];
  let groups = 0; 
  
  for (let i = 0; i < 128*128; i++) {
    let buildingGroup = false;
    let stack = [];
    stack.push(i);
    
    while (stack.length) {
      let current = stack.pop();
      let x = current % 128;
      let y = (current / 128) | 0;
      
      if (visited.includes(current)) {
        continue;
      }

      visited.push(current);
      
      if (rows[y][x] == '1' && !buildingGroup) {
        buildingGroup = true;
        groups++;
      }
      
      if (rows[y][x] == '0') {
        continue;
      }
      
      [-1, 0, 1].forEach(dx => {
        [-1, 0, 1].forEach(dy => {
          if (((dx == 0) ^ (dy == 0)) && (x + dx >= 0 && x + dx <= 127 && y + dy >= 0 && y + dy <= 127)) {
            stack.push((y + dy) * 128 + x + dx);
          }
        });
      });
    }
  }
  
  return groups;
}