function sortArrayByParityII(nums) {
  let len = nums.length
  let resArr = new Array(len).fill(0)
  let odd = 1, even = 0
  for (let i = 0; i < len; i++) {
    if (nums[i] % 2 === 0) {
      resArr[even] = nums[i]
      even+=2
    } else {
      resArr[odd] = nums[i]
      odd+=2
    }
  }
  return resArr
}
const nums = [4,2,5,7]
const res = sortArrayByParityII(nums)
console.log(res)
