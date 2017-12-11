module.exports = input => {
  let coords = input.split(',').reduce((coords, current) => {
    switch (current) {
      case 'n':
        if (coords[0] < 0) {
          coords[0]++;
        } else if (coords[1] < 0 || coords[2] < 0) {
          coords[1]++;
          coords[2]++;
        } else {
          coords[0]++;
        }; break;
      case 's':
        if (coords[0] > 0) {
          coords[0]--;
        } else if (coords[1] > 0 || coords[2] > 0) {
          coords[1]--;
          coords[2]--;
        } else {
          coords[0]--;
        }; break;
      case 'nw':
        if (coords[1] < 0) {
          coords[1]++;
        } else if (coords[0] < 0 || coords[2] > 0) {
          coords[0]++;
          coords[2]--;
        } else {
          coords[1]++;
        }; break;
      case 'se':
        if (coords[1] > 0) {
          coords[1]--;
        } else if (coords[0] > 0 || coords[2] < 0) {
          coords[0]--;
          coords[2]++;
        } else {
          coords[1]--;
        }; break;
      case 'ne':
        if (coords[2] < 0) {
          coords[2]++;
        } else if (coords[0] < 0 || coords[1] > 0) {
          coords[0]++;
          coords[1]--;
        } else {
          coords[2]++;
        }; break;
      case 'sw':
        if (coords[2] > 0) {
          coords[2]--;
        } else if (coords[0] > 0 || coords[1] < 0) {
          coords[0]--;
          coords[1]++;
        } else {
          coords[2]--;
        }; break
    }

    return coords;
  }, [0, 0, 0]);

  return Math.abs(coords[0]) + Math.abs(coords[1]) + Math.abs(coords[2]);

}