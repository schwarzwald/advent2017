module.exports = input => {
  let result = 0;

  for (let i = position = 0; i < 50000000; i++) {
    result = (position = (position + +input) % (i + 1) + 1) == 1? i + 1 : result;
  }

  return result;
};