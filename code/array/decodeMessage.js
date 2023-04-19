function decodeMessage(key, message) {
  let cur = 'a'
  let rules = new Map()
  for (let i = 0; i < key.length; i++) {
      let str = key[i]
      if (str !== ' ' && !rules.has(str)) {
          rules.set(str, cur)
          cur = String.fromCharCode(cur.charCodeAt() + 1)
      }
  }

  let res = ''
  for (let i = 0; i < message.length; i++) {
      let str = message[i]
      if (str !== ' ') {
          res += rules.get(str)
      } else {
          res += ' '
      }
  }
  return res
}

const key = "the quick brown fox jumps over the lazy dog", message = "vkbs bs t suepuv"
const res = decodeMessage(key, message)
console.log(res)