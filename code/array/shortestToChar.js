function shortestToChar(s, c) {
  let len = s.length
  let resArr = new Array(len).fill(len)
  let k = -len
  // debugger
  for (let i = 0; i < len; i++) {
    if (s[i].charCodeAt() === c.charCodeAt()) {
      // 倒着往回写值 j是左区间  (k + i - 1)是 算出右区间
      for (let j = i; j >= Math.max(0, (k + i - 1) >> 1); j--) {
        resArr[j] = Math.min(resArr[j], i - j)
      }
      k = i // 找到一样的 并记录
    } else {
      resArr[i] = Math.min(resArr[i], i - k) // k为c 的位置 这里表示除c 之外的位置是 当前i 减去 c 的位置
    }
  }
  return resArr
}

const s = "loveleetcode", c = "e"
const res = shortestToChar(s, c)
console.log(res)
