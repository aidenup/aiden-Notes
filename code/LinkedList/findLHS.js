function findLHS(nums) {
  nums.sort((a, b) => a - b)
  let res = 0
  let start = 0, end = 0
  while (end < nums.length) {
    while (nums[end] - nums[start] > 1) {
      start++
    }
    if (nums[end] - nums[start] === 1) {
      res = Math.max(res, end - start + 1)
    }
    end++
  }
  return res
}
const nums = [1,3,2,2,5,2,3,7]
const res = findLHS(nums)
console.log(res)