module.exports = input => {
  let buffer = input.split(/\s/).map(Number);
  let history = [];
  
  while (!history.includes(buffer.join())) {
    history.push(buffer.join());
    let max = Math.max(...buffer);
    let idx = buffer.indexOf(max);
    
    let inc = (max / buffer.length) | 0;
    let rem = max % buffer.length;
    buffer[idx] = 0;
    
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] += ((i > idx && i <= idx + rem) || (i + buffer.length > idx && i + buffer.length <= idx + rem))? inc + 1: inc;
    }
  }
  
  return history.length - history.indexOf(buffer.join());
}