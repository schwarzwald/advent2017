module.exports = input => {
  let nodes = [];
  let children = [];
  
  input.split('\r\n').forEach(a => {
    let matches = /([\w]+)\s\([\d]+\)\s?-?>?\s?(.*)?/.exec(a);
    nodes.push(matches[1]);
    if (matches[2]) {
      children.push(...matches[2].split(', '));
    }
  });
  
  return nodes.filter(a => children.indexOf(a) == -1)[0]
}