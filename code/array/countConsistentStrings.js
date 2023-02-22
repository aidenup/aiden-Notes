function countConsistentStrings(allowed, words) {
  let mask = 0

  for (let i = 0; i < allowed.length; i++) {
    const c = allowed[i]
    mask |= 1 << (c.charCodeAt() - 'a'.charCodeAt())
  }

  let res = 0
  for (const word of words) {
    let mask1 = 0
    for (let i = 0; i < word.length; i++) {
      const c = word[i]
      mask1 |= 1 << (c.charCodeAt() - 'a'.charCodeAt())
    }

    if ((mask1 | mask) === mask) {
      res++
    }
  }

  return res
}

const allowed = "ab", words = ["ad","bd","aaab","baa","badab"]
const res = countConsistentStrings(allowed, words)
console.log(res)
