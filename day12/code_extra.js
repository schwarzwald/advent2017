const subGroup = (node, pipes) => {
  let queue = [];
  let visited = [];
  let group = new Set();
  queue.push(node);
  group.add(node);
  
  while (queue.length) {
    let current = queue.pop();
    if (!visited.includes(current)) {
      visited.push(current);
      pipes.get(current).forEach(c => group.add(c));
      queue.push(...pipes.get(current));
    }
  }
  
  return group;
}

const partition = pipes => {
  let groups = [];
  
  [...pipes.keys()].forEach(node => {
    if (groups.filter(group => group.has(node)).length == 0) {
      groups.push(subGroup(node, pipes));
    }
  });
  
  return groups;
}

module.exports = input => {
  let pipes = new Map();

  input.split('\r\n').forEach(line => {
    let [, node, neighborsString] = /(\d+) <-> (.+)/.exec(line);
    let neighbors = neighborsString.split(', ');
    
    if (!pipes.has(node)) {
      pipes.set(node, neighbors);
    }
    
    neighbors.forEach(n => {
      if (!pipes.has(n)) {
        pipes.set(n, []);
      }
      
      if (!pipes.get(n).includes(node)) {
        pipes.get(n).push(node);
      }
    });
  });
  
  return partition(pipes).length;
}