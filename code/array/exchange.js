function exchange(nums) {
  const len = nums.length
  const resArr = new Array(len).fill(0)
  let left = 0, right = len - 1
  for (let i = 0; i < len; i++) {
    if (nums[i] % 2 === 1) {
      resArr[left++] = nums[i]
    } else {
      resArr[right--] = nums[i]
    }
  }
  return resArr
}
const nums = [1,2,3,4]
const res = exchange(nums)
console.log(res)

