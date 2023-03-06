function missingNumber(nums) {
  let len = nums.length
  nums.sort((a, b) => a - b)

  let left = 0, right = len - 1
  while(left <= right) {
    let mid = left + ((right - left) >> 1)
    console.log('mid', mid);
    if (nums[mid] > mid) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left
}

const nums = [9,6,4,2,3,5,7,0,1]

const res = missingNumber(nums)
console.log(res)

console.log(5 + (8 - 5) >> 1);