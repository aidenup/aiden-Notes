function minimumDifference(nums, k) {
  let res = Number.MAX_SAFE_INTEGER
  nums.sort((a, b) => a - b)
  let start = 0, end = k - 1
  while (end < nums.length) {
    res = Math.min(res, nums[end++] - nums[start++])
  }

  return res
}

const nums = [9,4,1,7], k = 2
const res = minimumDifference(nums, k)
console.log(res)
