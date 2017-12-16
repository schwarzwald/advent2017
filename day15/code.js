module.exports = input => {
  let [genA, genB] = input.split('\r\n').map(line => /(\d+)/.exec(line)[1]);
  let factA = 16807;
  let factB = 48271;
  let mod = 2147483647;

  let count = 0;
  let mask = (1 << 16) - 1;

  for (let i = 0; i < 40000000; i++) {
    genA = (genA * factA) % mod;
    genB = (genB * factB) % mod;
    if ((genA & mask) == (genB & mask)) {
      count++;
    }
  }

  return count;
};