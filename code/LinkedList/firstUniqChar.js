function firstUniqChar(s) {
  let strMap = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    strMap[s[i].charCodeAt() - 'a'.charCodeAt()]++
  }
  for (let i = 0; i < s.length; i++) {
    if (strMap[s[i].charCodeAt() - 'a'.charCodeAt()] === 1) return s[i]
  }

  return ' '
}

const s = "leetcode"
const res = firstUniqChar(s)
console.log(res)
