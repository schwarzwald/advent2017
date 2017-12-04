module.exports = input =>
  input.split('\r\n')
       .map(a => a.split(/\s/))
       .reduce((acc, curr) => acc + Math.max(...curr)-Math.min(...curr), 0);