module.exports = input => 
  input.split('\r\n').map(a => a.split(/\s/)).reduce((acc, curr) => curr.length == new Set(curr).size? acc + 1: acc, 0);