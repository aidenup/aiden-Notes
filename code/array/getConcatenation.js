function getConcatenation(nums) {
  const ans = new Array(2 * (nums.length)).fill(0)
  for (let i = 0; i < nums.length; i++) {
    ans[i] = nums[i]
    ans[i + nums.length] = nums[i]
  }
  return ans
}
const nums = [1,2,1]
const res = getConcatenation(nums)
console.log(res)
