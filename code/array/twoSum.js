function twoSum(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    if (nums[left] + nums[right] === target) {
      return [nums[left], nums[right]]
    } else if (nums[left] + nums[right] > target) {
      right--
    } else {
      left++
    }
  }
}

const nums = [10,26,30,31,47,60], target = 40
const res = twoSum(nums, target)

console.log(res)
