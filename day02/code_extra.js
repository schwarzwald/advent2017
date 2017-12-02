module.exports = input =>
  input.split('\r\n').reduce((acc, curr) =>
    acc + curr.split(/\s/).reduce((acc2, curr2, idx, arr) =>
      ((x, y) => Math.max(x, y) / Math.min(x, y))(
        arr.filter((v, idx2) => idx2 > idx && (!(curr2 % v) || !(v % curr2)))[0],
        curr2
      ) || acc2
    , 0)
  , 0);