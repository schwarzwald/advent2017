module.exports = input => {
  let instructions = input.split('\r\n').map(n => /(\w+)\s(\w+)\s(-?\d+)\sif\s(.*)/.exec(n));
  let registers = new Map();

  const test = (condition, registers) => {
    let [, reg, type, value] = /(\w+)\s([!=><]+)\s(-?\d+)/.exec(condition);
    return eval(`${registers.has(reg)? registers.get(reg): 0} ${type} ${value}`);
  }
  
  let maxTotal = 0;
  
  instructions.forEach(instr => {
    let [, reg, type, amount, condition] = instr;
    
    if (test(condition, registers)) {
      let current = registers.has(reg)? registers.get(reg): 0;
      registers.set(reg, current + (type == 'inc'? +amount: -amount));      
      maxTotal = Math.max(maxTotal, Math.max(...registers.values()));
    }
  });

  return maxTotal;
}