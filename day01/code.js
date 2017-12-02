const execute = require('../executor.js').execute;

execute('input.txt', function(input) {
  return input.split('').reduce((acc, curr, idx, arr) => curr == arr[(idx + 1) % arr.length]? acc + +curr: acc, 0);
});
