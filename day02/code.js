const execute = require('../executor.js').execute;

execute('input.txt', function(input) {
  return input.split('\r\n').reduce((acc, curr) =>
    acc + Math.max(...curr.split(/\s/))-Math.min(...curr.split(/\s/)),
  0);
});