function search(nums, target) {
  let ans = 0
  let leftIdx = binarySearch(nums, target, true)
  let rightIdx = binarySearch(nums, target, false) - 1
  if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] === target && nums[rightIdx] === target) {
    ans = rightIdx - leftIdx + 1
  }
  return ans
}

function binarySearch(nums, target, lower) {
  let left = 0, right = nums.length - 1, ans = nums.length
  while(left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] > target || (lower && nums[mid] >= target)) {
      right = mid - 1
      ans = mid
    } else {
      left = mid + 1
    }
  }
  return ans
}

const nums = [5,7,7,8,8,10], target = 8
console.log(search(nums, target))