function divisorSubstrings(num, k) {
  let str = num.toString()
  let res = 0
  
  for (let i = 0; i <= str.length - k; i++) {
    let the = str.slice(i, i + k)
    if (the != 0 && num % the === 0) {
      res++
    }
  }
  return res
}
const num = 2, k = 1
const res = divisorSubstrings(num, k)
console.log(res)