const manhattan = (vec) => Math.abs(vec[0]) + Math.abs(vec[1]) + Math.abs(vec[2]);

module.exports = input => {
  let particles = input.split('\r\n').map((line, idx) => {
    let [pos, vel, acc] = line.split(', ');
    const parse = inp => /\w=<([-\d]+),([-\d]+),([-\d]+)>/.exec(inp).map(Number).filter(p => !isNaN(p));

    return {
      name : idx,
      position : parse(pos),
      velocity : parse(vel),
      acceleration : parse(acc)
    }
  });    
  
  return particles.sort((a, b) => (manhattan(a.acceleration) - manhattan(b.acceleration)))[0].name
}