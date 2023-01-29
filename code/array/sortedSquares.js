function sortedSquares(nums) {
  let len = nums.length
  let res = new Array(len).fill(0)
  let i = 0, j = len - 1, k = len - 1
  while(i <= j) {
    let left = nums[i] * nums[i],
        right = nums[j] * nums[j]
    if(left < right) {
      res[k--] = right
      j--
    } else {
      res[k--] = left
      i++
    }
  }
  return res
}