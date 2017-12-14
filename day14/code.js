const hash = require('../day10/code_extra');

module.exports = input => {
  let used = 0;

  for (let i = 0; i < 128; i++) {
    let hashString = hash(`${input}-${i}`);
    for (let j = 0; j < 8; j++) {
      let hex = parseInt(hashString.substring(j * 4, (j + 1) * 4), 16);
      for (let k = 0; k < 16; k++) {
        if ((hex >> k) & 1) {
          used++;
        }
      }
    }
  }

  return used;
}