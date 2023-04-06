function minArray(numbers) {
  let left = 0; right = numbers.length - 1
  while(left <= right) {
    let mid = left + ((right - left) >> 1)
    console.log(left, right, mid);
    if (numbers[right] > numbers[mid]) {
      right = mid
    } else if (numbers[right] < numbers[mid]) {
      left = mid + 1
    } else {
      right--
    }
  }
  return numbers[left]
}

const arr = numbers = [3,1,3]
console.log(minArray(arr))