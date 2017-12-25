module.exports = input => {
  let ones = new Set();
  let positions = {};
  let position = 0;
  let cycles = 12302209;
  let state = 'A';

  let states = new Map();

  states.set('A', [[1, 1, 'B'], [0, -1, 'D']]);
  states.set('B', [[1, 1, 'C'], [0, 1, 'F']]);
  states.set('C', [[1, -1, 'C'], [1, -1, 'A']]);
  states.set('D', [[0, -1, 'E'], [1, 1, 'A']]);
  states.set('E', [[1, -1, 'A'], [0, 1, 'B']]);
  states.set('F', [[0, 1, 'C'], [0, 1, 'E']]);

  while (cycles--) {
    let [value, shift, transition] = states.get(state)[ones.has(position) ? 1: 0];
    (value) ? ones.add(position): ones.delete(position);
    position += shift;
    state = transition;
  }

  return ones.size;
}