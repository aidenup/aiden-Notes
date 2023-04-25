function countVowelSubstrings(word) {
  let res = 0
  let aeiou = new Map([
    ['a', 0],
    ['e', 0],
    ['i', 0],
    ['o', 0],
    ['u', 0],
  ])
  let i = -1, j = 0

  while (j < word.length) {
    if (!aeiou.has(word[j])) {
      i = j
      aeiou = clear(aeiou)
    } else {
      aeiou.set(word[j], aeiou.get(word[j]) + 1)
    }

    if (meet(aeiou)) {
      let temI = i
      while (meet(aeiou)) {
        res++
        aeiou.set(word[++temI], aeiou.get(word[temI]) - 1)
      }
    } else {
      j++
    }
  }
  return res
}
function clear() {
  const aeiou = new Map([
    ['a', 0],
    ['e', 0],
    ['i', 0],
    ['o', 0],
    ['u', 0],
  ])
  return aeiou
}
function meet(map) {
  for (const item of map) {
    if (item[1]<= 0) return false
  }
  return true
}

const word = "aeiouu"
const res = countVowelSubstrings(word)
console.log(res)
