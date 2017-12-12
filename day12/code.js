const countRelations = (node, pipes) => {
  let queue = [];
  let visited = [];
  let neighbors = new Set();
  queue.push(node);
  
  while (queue.length) {
    let current = queue.pop();
    if (!visited.includes(current)) {
      visited.push(current);
      pipes.get(current).forEach(c => neighbors.add(c));
      queue.push(...pipes.get(current));
    }
  }
  
  return neighbors.size;
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
  
  return countRelations('0', pipes);
}