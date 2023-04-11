function diStringMatch(s) {
let n = s.length
  let max = n, min = 0
  let perm = new Array(n + 1).fill(0)

  for (let i = 0; i < n; ++i) {
      perm[i] = s[i] === 'I' ? min++ : max--
  }
  perm[n] = min
  return perm
}

const s = "DDI"
const res = diStringMatch(s)
console.log(res)
