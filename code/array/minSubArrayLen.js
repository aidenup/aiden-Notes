function minSubArrayLen(target, nums) {
  let start = 0
  let res = nums.length + 1
  let tempRes = 0
  let sum = 0
  for (let end = 0; end < nums.length; end++) {
    sum += nums[end]
    while(sum >= target) {
      tempRes = end - start + 1
      res = tempRes < res ? tempRes : res
      sum -= nums[start++]
    }
  }
  return res > nums.length ? 0 : res
}

console.log(minSubArrayLen([2,3,1,2,4,3], 7));