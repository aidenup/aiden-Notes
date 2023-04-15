function distinctAverages(nums) {
  let len = nums.length
  let arr = nums.sort((a, b) =>  a - b)
  let left = 0, right = len - 1
  let res = new Set()
  while (left < right) {
    res.add((arr[left++] + arr[right--]) / 2)
  }
  return res.size
}

const nums = [10,2,2,0,4,0]
const res = distinctAverages(nums)
console.log(res)
