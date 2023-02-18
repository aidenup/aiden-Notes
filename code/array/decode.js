function decode(encoded, first) {
  let res = [first]
  for (let ch of encoded) {
    first ^= ch
    res.push(first)
  }
  return res
}

console.log(4^6);

