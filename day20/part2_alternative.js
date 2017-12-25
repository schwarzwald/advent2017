const manhattan = (vec) => Math.abs(vec[0]) + Math.abs(vec[1]) + Math.abs(vec[2]);

class Particle {
  constructor(name) {
    this.name = name;
    this.position = [0, 0, 0];
    this.velocity = [0, 0, 0];
    this.acceleration = [0, 0, 0];
  }
  
  advance() {
    this.velocity[0] += this.acceleration[0];
    this.velocity[1] += this.acceleration[1];
    this.velocity[2] += this.acceleration[2];
    
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
    this.position[2] += this.velocity[2];
  }
  
  collides(particle) {
    return this.position[0] == particle.position[0] && this.position[1] == particle.position[1] && this.position[2] == particle.position[2];
  }
}

module.exports = input => {
  let particles = input.split('\r\n').map((line, idx) => {
    const parse = inp => /\w=<([-\d]+),([-\d]+),([-\d]+)>/.exec(inp).map(Number).filter(p => !isNaN(p));
    
    let [pos, vel, acc] = line.split(', ');
    let p = new Particle(idx);
    
    p.position = parse(pos)
    p.velocity = parse(vel),
    p.acceleration = parse(acc)
    
    return p;
  });
  
  for (let i = 0; i < 1000; i++) {
    let collisions = new Set();
    
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        if (particles[i].collides(particles[j])) {
          collisions.add(particles[i]);
          collisions.add(particles[j]);
        }
      }
    }
    
    particles = particles.filter(p => !collisions.has(p));
    particles.forEach(p => p.advance());
  }
  
  return particles.length;

}