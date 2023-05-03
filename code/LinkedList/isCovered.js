function isCovered(ranges, left, right) {
  let arr = new Array(right).fill(0)
  for (i = 0; i < ranges.length; i++) {
    arr.fill(1, ranges[i][0] - 1, ranges[i][1])
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 1) {
      return false
    }
  }
  return true
}


const ranges = [[1,1]], left = 1, right = 50
const res = isCovered(ranges, left, right)
console.log(res)
