class Matrix {
  constructor(height, width) {
    this.values = new Array(width * height).fill(0);
    this.width = width;
    this.height = height;
  }

  setRow(row, values) {
    let offset = this.width * row;
    for (let i = 0; i < this.width; i++) {
      this.values[offset + i] = values[i];
    }
  }

  getRow(row) {
    let result = [];
    for (let i = 0; i < this.width; i++) {
      result.push(this.values[row * this.width + i]);
    }
    return result;
  }

  setCell(row, column, value) {
    this.values[this.width * row + column] = value;
  }

  getCell(row, column) {
    return this.values[this.width * row + column];
  }

}

const vector = values => {
  let result = new Matrix(1, values.length);
  for (let i = 0; i < values.length; i++) {
    result.setCell(0, i, values[i]);
  }

  return result;
}

const eye = size => {
  let result = new Matrix(size, size);
  for (let i = 0; i < size; i++) {
    result.setCell(i, i, 1);
  }
  return result;
}

const modMultiplyMatrix = (a, b, mod) => {
  let result = new Matrix(a.height, b.width);
  for (let i = 0; i < a.height; i++) {
    for (let j = 0; j < b.width; j++) {
      let sum = 0;
      for (let k = 0; k < a.width; k++) {
        sum += a.getCell(i, k) * b.getCell(k, j);
      }
      result.setCell(i, j, sum % mod);
    }
  }

  return result;
}

const modSquareMatrix = (a, exponent, mod) => square(a, eye(a.width), (a1, a2) => modMultiplyMatrix(a1, a2, mod), exponent);

const square = (a, one, operation, exponent) => {
  let order = 1;
  let powers = [one, a];
  let result = one;

  while (exponent) {
    if (order > 1) {
      powers[order] = operation(powers[(order / 2) | 0], powers[(order / 2) | 0]);
    }

    if (exponent & 1) {
      result = operation(result, powers[order])
    }

    order <<= 1;
    exponent >>= 1;
  }

  return result;
}

module.exports = {Matrix, vector, eye, modMultiplyMatrix, modSquareMatrix};