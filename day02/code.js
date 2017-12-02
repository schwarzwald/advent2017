module.exports = input =>
  input.split('\r\n').reduce((acc, curr) =>
    acc + Math.max(...curr.split(/\s/))-Math.min(...curr.split(/\s/)),
  0);