function findTheDistanceValue(arr1, arr2, d) {
  arr2.sort((a, b) => a - b)
  let res = 0

  for (let i = 0; i < arr1.length; i++) {
    let tmp = true
    let index = searchIndex(arr2, arr1[i])
    
    if (index - 1 >= 0) {
      tmp = tmp & Math.abs(arr1[i] - arr2[index - 1]) > d
    }

    if (index < arr2.length) {
      tmp = tmp & Math.abs(arr1[i] - arr2[index]) > d
    }

    if (tmp) res++
  }
  return res
}

function searchIndex(arr2, i) {
  let left = 0, right = arr2.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (arr2[mid] > i) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left
}

const arr1 = [4,5,8], arr2 = [10,9,1,8], d = 2
const res = findTheDistanceValue(arr1, arr2, d)
console.log(res)
