function arithmeticTriplets(nums, diff) {
  let res = 0
  const len = nums.length
  for (let i = 0, j = 1, k = 2; i < len - 2 && j < len - 1 && k < len; i++) {
    j = Math.max(j, i + 1)
    while(j < len - 1 && nums[j] - nums[i] < diff) {
      j++
    }
    if (j >= len - 1 || nums[j] - nums[i] > diff) {
      continue
    }

    k = Math.max(k, j + 1)
    while(k < len && nums[k] - nums[j] < diff) {
      k++
    }
    if (k < len && nums[k] - nums[j] === diff) {
      res++
    }
  }
  return res
}
const nums = [0,1,4,6,7,10], diff = 3
let res = arithmeticTriplets(nums, diff)
console.log(res)
