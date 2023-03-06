function intersect(nums1, nums2) {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  let left = 0, right = 0, resArr = []
  while (left < nums1.length && right < nums2.length) {
    if (nums1[left] === nums2[right]) {
      resArr.push(nums1[left])
      left++
      right++
    } else {
      nums1[left] < nums2[right] ? left++ : right++
    }
  }

  return resArr
}