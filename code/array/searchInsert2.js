function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1
  while(left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return left
}

const nums = [1,3,5,6], target = 2
console.log(searchInsert(nums, target))
