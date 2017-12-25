module.exports = input => {
  let buffer = [0];
  let position = 0;
  for (let i = 0; i < 2017; i++) {
    buffer.splice(position = (position + +input) % buffer.length + 1, 0, i + 1);
  }

  return buffer[position + 1];
}