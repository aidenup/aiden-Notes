function camelMatch(queries, pattern) {
  const n = pattern.length
  const answer = []
  for (const str of queries) {
    let m = str.length
    let bool = true
    let start = 0, end = 0
    while (start < m && end < n) {
      if (str[start] === pattern[end]) {
        start++
        end++
      } else {
        if (str[start] === str[start].toUpperCase()) {
          bool = false
          break
        } else {
          start++
        }
      }
    }
    while (start < m) {
      if (str[start] === str[start].toUpperCase()) {
        bool = false
        break
      } else {
        start++
      }
    }
    if (end !== n) {
      bool = false
    }
    answer.push(bool)
  }
  return answer
}

const queries = ["FooBar","FooBarTest","FootBall","FrameBuffer","ForceFeedBack"]
const pattern = "FoBaT"
const res = camelMatch(queries, pattern)
console.log(res)
