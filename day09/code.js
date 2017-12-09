module.exports = input => {
  let score = 0;

  let state = {
    garbage : false,
    escape : false,
    level : 0
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
      }
    } else {
      switch (c) {
        case '<': state.garbage = true;  return;
        case '{': score += ++state.level;  return;
        case '}': state.level--;  return;
      }
    }
  });

  return score;
}