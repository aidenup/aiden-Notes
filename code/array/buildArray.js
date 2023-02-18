function buildArray(nums) {
  const ans = new Array(nums.length).fill(0)
  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[nums[i]]
  }
  return ans
}

const nums = [0,2,1,5,3,4]
const res = buildArray(nums)
console.log(res)
