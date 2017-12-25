module.exports = input => {
  let root = Math.ceil(Math.sqrt(input));
  let size = root & 1 ? root: root + 1;
  let mid = ((size + 1) / 2) % (size - 1);
  let mod = input % (size - 1);
  let dist = Math.min(Math.abs(mod - mid), Math.abs(mid - mod - size + 1));

  return dist + (size - 1) / 2;
}