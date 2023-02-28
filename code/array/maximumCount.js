function maximumCount(nums) {
  if (nums[0] > 0) return nums.length
  const findIndex = (nums) => {
    let left = 0, right = nums.length - 1
    let index = -1
    while (left <= right) {
      const mid = left + ((right - left) >> 1)
      console.log(left, right, mid);
      if (nums[mid] < 0) {
        left = mid + 1
        index = mid
      } else {
        right = mid - 1
      }
    }
    return index
  }
  const leftLen = findIndex(nums) + 1
  console.log(leftLen);
  let zeroCount = 0
  for (let i = leftLen; i < nums.length; i++) {
    if (!nums[i]) {
      zeroCount++
    } else {
      break
    }
  }
  const rightLen = nums.length - leftLen - zeroCount
  return Math.max(leftLen, rightLen)
}
const nums = [-3,-2,-1,0,0,1,2]
const res = maximumCount(nums)
console.log(res)
