class Pattern {

  constructor(preimage, image) {
    this.preimage = preimage;
    this.image = image.split('/');
    this._compile();
  }

  _compile() {
    this.variations = new Set();

    for (let i = 0; i < 4; i++) {
      this.variations.add(this._rotate(this.preimage, i));
      this.variations.add(this._flipX(this._rotate(this.preimage, i)));
      this.variations.add(this._flipY(this._rotate(this.preimage, i)));
    }
  }

  _flipX(img) {
    return img.split('/').map(p => p.split('').reverse().join('')).join('/');
  }

  _flipY(img) {
    return img.split('/').reverse().join('/');
  }

  _rotate(img, seg = 1) {
    let result = img.split('/').map(line => line.split(''));
    let size = result.length;

    for (let c = 0; c < seg % 4; c++) {
      result = [...new Array(size)].map((row, i) => [...new Array(size)].map((col, j) => result[size - j - 1][i]));
    }
    return result.map(line => line.join('')).join('/');
  }

  match(pattern) {
    return pattern.length == this.preimage.length && this.variations.has(pattern);
  }

}

const view = (grid, size, x, y) => [...new Array(size)].map((r, i) => [...new Array(size)].map((c, j) => grid[y + i][x + j]).join('')).join('/');

const matchPattern = (pattern, patterns) => patterns.find(p => p.match(pattern));

const tessellate = (grid, size, patterns) => {
  let tileCount = grid.length / size;
  let result = [...new Array(tileCount * (size + 1))].map(r => new Array(tileCount * (size + 1)));

  for (let i = 0; i < tileCount; i++) {
    for (let j = 0; j < tileCount; j++) {
      let pattern = matchPattern(view(grid, size, j * size, i * size), patterns).image;
      for (let y = 0; y < size + 1; y++) {
        for (let x = 0; x < size + 1; x++) {
          result[i * (size + 1) + y][j * (size + 1) + x] = pattern[y][x];
        }
      }
    }
  }

  return result;
}

module.exports = (input, cycles) => {
  let patterns = input.split('\r\n').map(line => new Pattern(...line.split(' => ')));
  let grid = ['.#.', '..#', '###'];

  while (cycles--) {
    grid = tessellate(grid, grid.length % 2 == 0? 2: 3, patterns);
  }

  return grid.reduce((total, line) => total + line.filter(c => c == '#').length, 0);
}