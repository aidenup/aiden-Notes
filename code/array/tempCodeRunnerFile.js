function peakIndexInMountainArray(arr) {
  let left = 0, right = arr.length - 1
  let res = 0
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (arr[mid] > arr[mid - 1] && arr[mid] < arr[mid + 1]) {
      res = mid
    }
  }

  return res
}

const arr = [1,3,5,4,2]
const res = peakIndexInMountainArray(arr)
console.log(res)