function nextGreatestLetter(letters, target) {
  if (target > letters[letters.length - 1]) {
    return letters[0]
  }
  let left = 0; right = letters.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (letters[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return letters[left]
}

const letters = ["c", "f", "j"], target = "a"
const res = nextGreatestLetter(letters, target)
console.log(res)
