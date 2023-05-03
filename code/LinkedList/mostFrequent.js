function mostFrequent(nums, key) {
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === key && nums[i + 1]) {
      map.set(nums[i + 1], (map.get(nums[i + 1]) || 0) + 1)
    }
  }
  let res = 0, max = 0
  for (const [key, val] of map) {
    if (val > max) {
      max = val
      res = key
    }
  }
  return res
}
const nums = [1,100,200,1,100], key = 1
const res = mostFrequent(nums, key)
console.log(res)