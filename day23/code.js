module.exports = input => {
  let registers = new Map();
  let instructions = input.split('\r\n');
  let ip = 0;
  let mulCount = 0;

  const getVal = value => isNaN(value) ? +registers.get(value) || 0: +value;

  while(ip < instructions.length) {
    let instr = instructions[ip];
    let [,type, arg1, arg2] = /(\w+)\s([\d\w]+)\s?(.*)?/.exec(instr);

    switch (type) {
      case 'set': registers.set(arg1, getVal(arg2)); break;
      case 'sub': registers.set(arg1, +getVal(arg1) - +getVal(arg2)); break;
      case 'mul': registers.set(arg1, +getVal(arg1) * +getVal(arg2)); mulCount++; break;
      case 'jnz': ip += (getVal(arg1) != 0)? getVal(arg2): 1; continue;
    }

    ip++;
  }

  return mulCount;
}