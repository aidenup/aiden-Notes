function isAnagram(s, t) {
  if (s.length !== t.length || s === t) return false
  let charArr = new Array(26).fill(0)
  for (let i = 0; i < s.length; i++) {
    charArr[s[i].charCodeAt() - 'a'.charCodeAt()]++
  }
  console.log(charArr)
  for (let i = 0; i < t.length; i++) {
    charArr[t[i].charCodeAt() - 'a'.charCodeAt()]--
  }
  console.log(charArr);
  for (let i = 0; i < charArr.length; i++) {
    if (charArr[i] !== 0) return false
  }
  return true
}

const s = "a", t = "a"
const res = isAnagram(s, t)