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

  input.split(',').map(Number).forEach(length => {
    reverse(current, current + length - 1, list);
    current += length + skip++;
  });

  return list[0] * list[1];
}