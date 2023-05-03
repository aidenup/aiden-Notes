function findEvenNumbers(digits) {
  const res = []
  const map = new Map([[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0]])
  for (let num of digits) {
    // if (map.get(num) >= 3) continue
    map.set(num, map.get(num) + 1)
  }
  digits = []
  for (let [key, val] of map) {
    while (val) {
      digits.push(key)
      val--
    }
  }
  let len = digits.length
  for (let i = 0; i < len; i++) {
    const pre = digits[i]
    if (pre === 0) continue
    for (let j = 0; j < len; j++) {
      if (i === j) continue
      const cur = digits[j]
      for (k = 0; k < len; k++) {
        if (k === i || k === j) continue
        const next = digits[k]
        if (next % 2 !== 0) continue
        const sum = pre * 100 + cur * 10 + next
        if (!res.includes(sum)) ret.push(sum)
      }
    }
  }
  return res.sort((a, b) => a - b)
}

const digits = [2,1,3,0]
const res = findEvenNumbers(digits)
console.log(res)