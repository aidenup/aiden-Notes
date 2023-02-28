function targetIndices(nums, target) {
  let nums2 = nums.sort((a, b) => a - b)
  let res = []
  for (let i = 0; i < nums2.length; i++) {
    if (nums[i] === target) {
      res.push(i)
    }
  }
  return res
}

const nums = [1,2,5,2,3], target = 2
const res = targetIndices(nums, target)
console.log(res)