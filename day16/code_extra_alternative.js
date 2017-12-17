const {Matrix, vector, eye, modMultiplyMatrix, modSquareMatrix} = require("./math-shit.js");

const spin = (x, size) => {
  let permutation = new Matrix(size, size);
  for (let i = 0; i < size; i++) {
    permutation.setCell(i, (i + x) % size, 1);
  }
  return permutation;
}

const exchange = (a, b, size) => {
  let permutation = eye(size);
  permutation.setCell(+a, +a, 0);
  permutation.setCell(+a, +b, 1);
  permutation.setCell(+b, +b, 0);
  permutation.setCell(+b, +a, 1);
  return permutation;
}

const partner = (a, b, size) => {
  return exchange(a.charCodeAt(0) - 97, b.charCodeAt(0) - 97, size);
}

const compileTransformations = (moves, size) => {
  return moves.reduce(([trans, sub], m) => {
    let arg = m.substring(1);
    switch (m[0]) {
      case 's': return [modMultiplyMatrix(trans, spin(+arg, size), 2), sub];
      case 'x': return [modMultiplyMatrix(trans, exchange(...arg.split('/'), size), 2), sub];
      case 'p': return [trans, modMultiplyMatrix(sub, partner(...arg.split('/'), size), 2)];
    }
  }, [eye(size), eye(size)]);
}

module.exports = input => {
  let size = 16;
  let cycles = 1000000000;
  let members = [...new Array(size).keys()];
  let [transposition, substitution] = compileTransformations(input.split(','), size);

  let totalTransposition = modSquareMatrix(transposition, cycles, 2);
  let totalSubstitution = modSquareMatrix(substitution, cycles, 2);

  return modMultiplyMatrix(vector(members), totalTransposition, size).getRow(0).map(i => String.fromCharCode(97 + totalSubstitution.getRow(i).indexOf(1))).join('');
};