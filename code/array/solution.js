function solution(isBadVersion) {
  return function(n) {
    let left = 0, right = n.length - 1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (isBadVersion[mid]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return left
  }
}