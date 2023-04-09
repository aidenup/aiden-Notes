function missingNumber(nums) {
  let left = 0, right = nums.length - 1
  while(left < right) {
    let mid = left + ((right - left) >> 1)
    if (nums[mid] !== mid) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return nums[right] === right ? right + 1 : right
}

const nums = [0, 1, 3]
console.log(missingNumber(nums))