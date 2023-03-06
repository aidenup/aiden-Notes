function countNegatives(grid) {
  let res = 0
  for (const subGird of grid) {
    let left = 0, right = subGird.length - 1, pos = -1
    console.log(left, right);
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (subGird[mid] < 0) {
        pos = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
      
    }
    if (~pos) res += subGird.length - pos
  }
  return res
}

// const grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
// const grid = [[3,2],[1,0]]
// const grid = [[1,-1],[-1,-1]]
const grid = [[7,-3]]
const res = countNegatives(grid)
console.log(res)
