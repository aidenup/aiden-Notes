function mostFrequentEven(nums) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 == 0) {
      map.set(nums[i], (map.get(nums[i]) || 0) + 1)
    }
  }
  if (map.size === 0) {
    return -1
  }

  let res = -1, count = 0
  for (const [key, val] of map) {
    if (val > count) {
      count = val
      res = key
    }
  }
  return res
}
const nums = [0,1,2,2,4,4,1]
const res = mostFrequentEven(nums)
console.log(res)
