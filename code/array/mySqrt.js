function mySqrt(x) {
  let left = 0, right = x
  let res = -1
  while(left <= right) {
      let mid = left + ((right - left) >> 1)
      if (mid * mid <= x) {
        left = mid + 1
        res = mid
      } else {
        right = mid - 1
      }
  }
  return res
}

console.log(mySqrt(0))
