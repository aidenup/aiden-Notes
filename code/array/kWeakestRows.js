function kWeakestRows(mat, k) {
  let resArr = []
  for (let i = 0; i < mat.length; i++) {
    let left = 0, right = mat[i].length - 1, pos = -1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (mat[i][[mid]] === 0) {
        right = mid - 1
      } else {
        pos = mid
        left = mid + 1
      }
    }
    resArr[i] = [i, pos + 1]
  }

  resArr.sort((a, b) => a[1] - b[1])
  let res = []
  for (let i = 0; i < k; i++) {
    res[i] = resArr[i][0]
  }
  return res
}
const mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], k = 3
const res = kWeakestRows(mat, k)
console.log(res)