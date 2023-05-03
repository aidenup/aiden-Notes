function missingNumber(nums) {
  const set = new Set()
  let res = -1
  for (let i = 0; i < nums.length; i++) {
    set.add(nums[i])
  }
  for (let i = 0; i <= nums.length; i++) {
    if (!set.has(i)) {
      res = i
      break
    }
  }
  return res
  // let sortNums = nums.sort((a, b) => a - b)
  // for (var i = 0; i < sortNums.length; i++) {
  //   if (sortNums[i] !== i) {
  //     return i
  //   }
  // }
  // return i
}

const nums = [0]
const res = missingNumber(nums)
console.log(res)