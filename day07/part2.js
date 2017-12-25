module.exports = input => {
  let nodes = [];
  let children = new Map();
  let weights = new Map();
  
  input.split('\r\n').forEach(a => {
    let matches = /([\w]+)\s\(([\d]+)\)\s?-?>?\s?(.*)?/.exec(a);
    nodes.push(matches[1]);
    weights.set(matches[1], +matches[2]);
    if (matches[3]) {
      children.set(matches[1], matches[3].split(', '));
    }
  });
    
  const totalWeight = node => 
    children.has(node)? 
      children.get(node).reduce((total, child) => total + totalWeight(child), weights.get(node)): 
      weights.get(node);
  
  const isBalanced = node => 
    children.has(node)? 
      new Set(children.get(node).map(n => totalWeight(n))).size == 1: 
      true;
  
  const hasChildrenBalanced = node => 
    children.has(node)?
      children.get(node).reduce((total, child) => total && isBalanced(child), true):
      true;
  
  for (let i in nodes) {
    let node = nodes[i];
    
    if (!isBalanced(node) && hasChildrenBalanced(node)) {
      let childrenWeights = new Map();
  
      children.get(node).forEach(a => childrenWeights.set(a, totalWeight(a)));
      let entries = [...childrenWeights.entries()];
      
      for (let j = 0; j < entries.length; j++) {
        let current = entries[j][1];
        let previous = entries[(j - 1 + entries.length) % entries.length][1]
        let next = entries[(j + 1) % entries.length][1];
        
        if (current != previous && current != next) {
          return weights.get(entries[j][0]) + next - current;
        }
      }
    }
  }
  
  return 0;  
}