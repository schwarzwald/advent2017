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

const dance = (moves, arr) => moves.reduce((members, m) => m(members), arr);

const compileMoves = moves => {
  return moves.map(m => {
    let arg = m.substring(1);
    switch (m[0]) {
      case 's': return (members) => spin(+arg, members);
      case 'x': return (members) => exchange(...arg.split('/'), members);
      case 'p': return (members) => partner(...arg.split('/'), members);
    }
  });
}

module.exports = input => {
  let moves = compileMoves(input.split(','));
  let members = [...new Array(16).keys()].map(i => String.fromCharCode(97 + i));
  let cycles = 1000000000;
  let visited = [];

  do {
    visited.push(members.join(''));
    dance(moves, members);

    if (visited.includes(members.join(''))) {
      return visited[(cycles - 1) % visited.length];
    }
  } while (--cycles);

  return members.join('');
};