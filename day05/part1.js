module.exports = input => {
  let instructions = input.split('\r\n');
  for (var ip = 0, cycles = 0; ip >= 0 && ip < instructions.length; cycles++, ip += instructions[ip]++);
  return cycles;
}