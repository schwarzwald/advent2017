const execute = require('../executor.js').execute;

execute('input.txt', function(input) {
  const step = input.length / 2;
  return input.split('').reduce((acc, curr, idx, arr) => curr == arr[(idx + step) % arr.length]? acc + +curr: acc, 0);
});
