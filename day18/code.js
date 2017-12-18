module.exports = input => {
  let registers = new Map();
  let instructions = input.split('\r\n');
  let ip = 0;
  let sound = 0;
  
  const getVal = value => isNaN(value) ? +registers.get(value) || 0: +value;
  
  while(ip < instructions.length) {
    let instr = instructions[ip];
    let [,type, arg1, arg2] = /(\w+)\s([\d\w]+)\s?(.*)?/.exec(instr);
    
    if (type == 'set') {
      registers.set(arg1, getVal(arg2));
    }
    
    if (type == 'add') {
      registers.set(arg1, +getVal(arg1) + +getVal(arg2));
    }
    
    if (type == 'mul') {
      registers.set(arg1, +getVal(arg1) * +getVal(arg2));
    }
    
    if (type == 'mod') {
      registers.set(arg1, +getVal(arg1) % +getVal(arg2));
    }
    
    if (type == 'snd') {
      sound = getVal(arg1);
    }
    
    if (type == 'rcv') {
      if (getVal(arg1) != 0) {
        return sound;
      }
    }
    
    if (type == 'jgz') {
      if (getVal(arg1) > 0) {
        ip += getVal(arg2);
        continue;
      }
    }

    ip++;
  } 
  
  return sound;
}