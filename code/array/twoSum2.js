function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1
  while (left <= right) {
      if (numbers[left] + numbers[right] === target) {
          return [left, right]
      } else if (numbers[left] + numbers[right] < target) {
          left++
      } else {
          right--
      }
  }
}

const numbers = [1,2,4,6,10], target = 8
const res = twoSum(numbers, target)
console.log(res)
