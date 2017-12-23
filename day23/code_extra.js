const prime = p => [...new Array(Math.sqrt(p) | 0)].every((d, idx) => p % (idx + 2));

module.exports = input => {
  for(var h = 0, b = 57 * 100 + 100000, c = b + 17000; b != c + 17; h += !prime(b)? 1: 0, b += 17);
  return h;
}