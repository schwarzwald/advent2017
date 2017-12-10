const reverse = (a, b, arr) => {
  for (let i = a; i < (a + b) / 2; i++) {
    let i1 = i % arr.length;
    let i2 = (a + b - i) % arr.length;

    arr[i1] = arr[i1] ^ arr[i2] ^ (arr[i2] ^= (arr[i1] ^= arr[i2]))
  }
}

module.exports = input => {
  let list  = [...new Array(256)].map((a, i) => i);
  let skip = 0;
  let current = 0;

  let lengths = [...[...input].map(c => c.charCodeAt(0)).map(Number), 17, 31, 73, 47, 23];

  for (let i = 0; i < 64; i++) {
    lengths.forEach(length => {
      reverse(current, current + length - 1, list);
      current += length + skip++;
    });
  }

  let result = new Array(16);
  list.forEach((a, idx) => result[(idx / 16) | 0] ^= a);

  return result.reduce((hash, curr) => hash + (curr < 16 ? "0": "") + curr.toString(16), "");
}