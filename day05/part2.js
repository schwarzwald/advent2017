module.exports = input => {
  let instructions = input.split('\r\n').map(Number);
  let ip = 0;
  let cycles = 0;
  
  while (ip >= 0 && ip < instructions.length) {
    let offset = instructions[ip];
    instructions[ip] += offset > 2? -1: 1;
    ip += offset;
    cycles++;
  }
  
  return cycles;
}