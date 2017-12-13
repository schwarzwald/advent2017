module.exports = input => {
  let layers = new Map();
  
  input.split('\r\n').forEach(line => {
    let [, index, depth] = /(\d+): (\d+)/.exec(line);
    layers.set(+index, +depth);
  });
  
  let max = Math.max(...layers.keys());
  let severity = 0;
  
  for (let i = 0; i <= max; i++) {
    if (layers.has(i) && (i % (layers.get(i) * 2 - 2)) == 0) {
      severity += i * layers.get(i);
    }
  }
  
  return severity;
}