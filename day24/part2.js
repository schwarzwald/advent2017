module.exports = input => {
  let nodeMap = new Map();
  
  input.split('\r\n')
    .map(n => n.split('/'))
    .map((n, id) => new Object({ id : id, p1: +n[0], p2: +n[1]}))
    .forEach((n, idx, arr) => {
      nodeMap.set(n.p1, nodeMap.get(n.p1) || new Set());
      nodeMap.set(n.p2, nodeMap.get(n.p2) || new Set());
    
      arr.filter(m => [m.p1, m.p2].includes(n.p1)).forEach(m => nodeMap.get(n.p1).add(m));
      arr.filter(m => [m.p1, m.p2].includes(n.p2)).forEach(m => nodeMap.get(n.p2).add(m));
    });

  let maxLength = 0;
  let maxScore  = 0;
  let stack = [];
  
  stack.push({ node: { p1: 0, p2: 0 }, connector: 0, trace : [], score : 0 });
  
  while (stack.length) {
    let { node, connector, trace, score } = stack.pop();
    let free = (node.p1 == connector)? node.p2: node.p1;
    let connections = [...nodeMap.get(free).values()].filter(n => !trace.includes(n.id));   
 
    connections.forEach(c => stack.push({ node: c, connector: free, trace: [c.id, ...trace], score: score + c.p1 + c.p2 }));
    
    if (!connections.length) {
      if (trace.length > maxLength) {
        maxScore = score;
        maxLength = trace.length;
      } else if (trace.length == maxLength) {
        maxScore = Math.max(maxScore, score);
      }
    }
  }
  
  return maxScore;
}