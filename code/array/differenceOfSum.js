function differenceOfSum(nums) {
  let count = 0, subCount = 0
  nums.forEach(item => {
    count+=item
  })
  let str = nums.join('')
  for (let i = 0; i < str.length; i++) {
    subCount+=parseInt(str[i])
  }
  return count - subCount
}

const nums = [1,15,6,3]
const res = differenceOfSum(nums)
console.log(res)
