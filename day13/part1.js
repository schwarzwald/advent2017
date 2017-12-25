module.exports = input => {
  let layers = [];

  input.split('\r\n').forEach(line => {
    let [, index, depth] = /(\d+): (\d+)/.exec(line);
    layers[+index] = +depth;
  });

  let max = Math.max(...layers.keys());
  let severity = 0;

  for (let i = 0; i <= max; i++) {
    if (layers[i] && (i % (layers[i] * 2 - 2)) == 0) {
      severity += i * layers[i];
    }
  }

  return severity;
}