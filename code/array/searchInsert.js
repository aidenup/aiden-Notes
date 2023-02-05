function searchInsert(nums, target) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    // let mid = left + ((right - left) >> 1)
    let mid = (left + right) >> 1
    console.log(mid, nums[mid]);
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left
}
let nums = [1,3,5,6], target = 10
console.log(searchInsert(nums, target));
