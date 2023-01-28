function search(nums, target) {
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
  return -1
}

function search2(nums, target) {
  let left = 0, right = nums.length
  while(left < right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] > target) {
      right = mid
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}

nums = [-1,0,3,5,9,12,14,20], target = 9
let res = search(nums, target)
console.log(res);
