function findRepeatNumber(nums) {
  // nums.sort((a, b) =>  a - b)
  // for (let i = 0, k = 1; i < nums.length; i++) {
  //   if (nums[i] !== nums[k]) {
  //     k++
  //   } else {
  //     return nums[i]
  //   }
  // }
  let set = new Set()
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i])
    if (set.has(nums[i])) {
      return nums[i]
    }
  }
}
const nums = [2, 3, 1, 0, 2, 5, 3]
const res = findRepeatNumber(nums)
console.log(res)
