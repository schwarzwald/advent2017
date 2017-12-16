const spin = (x, arr) => {
  arr.unshift(...arr.splice(arr.length - x, x));
  return arr;
}

const exchange = (a, b, arr) => {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
  return arr;
}

const partner = (a, b, arr) => exchange(arr.indexOf(a), arr.indexOf(b), arr);

module.exports = input => {
  let result = input.split(',').reduce((members, m) => {
    let arg = m.substring(1);
    switch (m[0]) {
      case 's': return spin(+arg, members);
      case 'x': return exchange(...arg.split('/'), members);
      case 'p': return partner(...arg.split('/'), members);
    }
  }, [...new Array(16).keys()].map(i => String.fromCharCode(97 + i)));

  return result.join('');
};