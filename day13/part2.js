module.exports = input => {
  let layers = [];

  input.split('\r\n').forEach(line => {
    let [, index, depth] = /(\d+): (\d+)/.exec(line);
    layers[+index] =  +depth;
  });

  let max = Math.max(...layers.keys());
  let isCaught = false;
  let delay = 0;

  do {
    isCaught = false;
    for (let i = 0; i <= max; i++) {
      if (layers[i] && ((i + delay) % (layers[i] * 2 - 2)) == 0) {
        isCaught = true;
        delay++;
        break;
      }
    }
  } while (isCaught);

  return delay;
}