function isAlienSorted(words, order) {
  const map = new Map()
  for (let i = 0; i < order.length; i++) {
    map.set(order[i], i)
    map.set(undefined, -1)
  }
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = 0; j < Math.max(words[i].length, words[i + 1].length); j++) {
      let left = map.get(words[i][j]), right = map.get(words[i + 1][j])
      if (left === right) {
        continue
      } else if (left > right) {
        return false
      } else {
        break
      }
    }
  }
  return true
}
const words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
const res = isAlienSorted(words, order)
console.log(res)