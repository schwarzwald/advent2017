class Program {
  constructor(id, instructions) {
    this.registers = new Map();
    this.registers.set('p', id);
    this.queue = [];
    this.ip = 0;
    this.isWaiting = false;
    this.sendCount = 0;
    this.instructions = instructions;
  }
  
  setReceiver(program) {
    this.receiver = program;
  }
  
  getVal(value) {
    return isNaN(value) ? +this.registers.get(value) || 0: +value;
  }
  
  send(program, value) {
    program.push(value);
    this.sendCount++;
  }
  
  push(value) {
    this.queue.push(this.getVal(value));
  }
  
  receive(reg) {
    if (this.queue.length) {
      this.registers.set(reg, this.queue.shift());
    }
  }
  
  exec() {
    let [,type, arg1, arg2] = /(\w+)\s([\d\w]+)\s?(.*)?/.exec(this.instructions[this.ip]);
    
    if (type == 'set') {
      this.registers.set(arg1, this.getVal(arg2));
    }
    
    if (type == 'add') {
      this.registers.set(arg1, +this.getVal(arg1) + +this.getVal(arg2));
    }
    
    if (type == 'mul') {
      this.registers.set(arg1, +this.getVal(arg1) * +this.getVal(arg2));
    }
    
    if (type == 'mod') {
      this.registers.set(arg1, +this.getVal(arg1) % +this.getVal(arg2));
    }
    
    if (type == 'jgz') {
      if (this.getVal(arg1) > 0) {
        this.ip += this.getVal(arg2);
        return;
      }
    }
    
    if (type == 'snd') {
      this.send(this.receiver, this.getVal(arg1));
    }
    
    if (type == 'rcv') {
      if (this.queue.length) {
        this.receive(arg1);
        this.isWaiting = false;
      } else {
        this.isWaiting = true;
        return;
      }
    }
  
    this.ip++;
  }

}

module.exports = input => {
  let instructions = input.split('\r\n');
  
  let p0 = new Program(0, instructions);
  let p1 = new Program(1, instructions);
  
  p0.setReceiver(p1);
  p1.setReceiver(p0);

  while(!p0.isWaiting || !p1.isWaiting) {
    p0.exec();
    p1.exec();
  } 
  
  return p1.sendCount;
}