module.exports = input => {
  let garbageCount = 0;

  let state = {
    garbage : false,
    escape : false
  };

  [...input].forEach(c => {
    if (state.escape) {
      state.escape = false;
      return;
    }

    if (state.garbage) {
      switch (c) {
        case '!': state.escape = true; return;
        case '>': state.garbage = false;  return;
        default: garbageCount++;
      }
    } else {
      state.garbage = c == '<';
    }
  });

  return garbageCount;
}