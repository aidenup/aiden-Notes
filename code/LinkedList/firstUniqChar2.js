function firstUniqChar(s) {
  let map = new Map()
  for (let i = 0; i < s.length; i++) {
    let word = s.charAt(i)
    let val = map.get(word)
    if (map.has(word)) {
      map.set(word, val + 1)
    } else {
      map.set(word, 1)
    }
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s.charAt(i)) === 1) {
      return i
    }
  }
  return -1
}
const s = "leetcode"
const res = firstUniqChar(s)
console.log(res)