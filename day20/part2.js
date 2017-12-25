const solveQuad = (a, b, c) => {
  let det = b*b - 4*a*c;
  let sqrtd = Math.sqrt(det);

  if (a == 0) {
    return (b == 0 && c == 0) ? [] : [-c / b, -c / b];
  }

  return (det < 0)? [NaN, NaN]: [(-b + sqrtd) / 2 / a, (-b - sqrtd) /2 / a];
}

const collisionTime = (p0, p1) => {
  let [tx, ty, tz] = [
    solveQuad((p0.a[0] - p1.a[0])/2, (p0.a[0] - p1.a[0])/2 + p0.v[0] - p1.v[0], p0.p[0] - p1.p[0]),
    solveQuad((p0.a[1] - p1.a[1])/2, (p0.a[1] - p1.a[1])/2 + p0.v[1] - p1.v[1], p0.p[1] - p1.p[1]),
    solveQuad((p0.a[2] - p1.a[2])/2, (p0.a[2] - p1.a[2])/2 + p0.v[2] - p1.v[2], p0.p[2] - p1.p[2])
  ];

  let collisionTimes = [];

  let txAlways = tx.length == 0;
  let tyAlways = ty.length == 0;
  let tzAlways = tz.length == 0;

  if (!txAlways) {
    tx.filter(t => t >= 0 && Number.isInteger(t)).forEach(t => {
      if ((tyAlways || ty.includes(t)) && (tzAlways || tz.includes(t))) {
        collisionTimes.push(t);
      }
    });
  } else if (!tyAlways) {
    ty.filter(t => t >= 0 && Number.isInteger(t)).forEach(t => {
      if (tzAlways || tz.includes(t)) {
        collisionTimes.push(t);
      }
    });
  } else if (!tzAlways) {
    tz.filter(t => t >= 0 && Number.isInteger(t)).forEach(t => collisionTimes.push(t));
  }

  return collisionTimes.length ? Math.min(...collisionTimes): NaN;
}

module.exports = input => {
  let particles = input.split('\r\n').map((line, idx) => {
    let [pos, vel, acc] = line.split(', ');
    const parse = inp => /\w=<([-\d]+),([-\d]+),([-\d]+)>/.exec(inp).map(Number).filter(p => !isNaN(p));

    return {
      name : idx,
      p : parse(pos),
      v : parse(vel),
      a : parse(acc)
    }
  });

 let collisions = []

 for (let i = 0; i < particles.length - 1; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      let time = collisionTime(particles[i], particles[j]);
      if (time) {
        collisions.push({t : time, p0 : particles[i].name, p1 : particles[j].name});
      }
    }
  }

  let [removed] = collisions.sort((a, b) => a.t - b.t).reduce(([removed, time], c) => {
    if (time == c.t || (!removed.has(c.p0) && !removed.has(c.p1))) {
      removed.add(c.p0);
      removed.add(c.p1);
    }

    return [removed, c.t];
  }, [new Set(), 0]);

  return particles.length - removed.size;
}