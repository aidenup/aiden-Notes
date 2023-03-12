function search(nums, target) {
  let pivot = 0
  while (pivot < nums.length && nums[pivot + 1] > nums[pivot]) {
    pivot++
  }

  function partSearch(i, j) {
    while (i <= j) {
      let mid = i + ((j - 1) >> 1)
      if (nums[mid] == target) {
        return mid
      } else if (nums[mid] > target) {
        j = mid - 1
      } else {
        i = mid + 1
      }
    }
    return -1
  }

  let s1 = partSearch(0, pivot)
  if (s1 != -1) {
    return s1
  } else {
    let s2 = partSearch(pivot + 1, nums.length - 1)
    if (s1 != -1) {
      return s2
    }
  }
  return -1
}

const nums = [4,5,6,7,0,1,2], target = 0
const res = search(nums, target)


