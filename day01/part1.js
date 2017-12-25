module.exports = input =>
  input.split('').reduce((acc, curr, idx, arr) => curr == arr[(idx + 1) % arr.length]? acc + +curr: acc, 0);
