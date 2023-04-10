function mergeArrays(nums1, nums2) {
  let resArr = []
  let len1 = nums1.length, len2 = nums2.length
  let index1 = 0, index2 = 0

  while(index1 < len1 && index2 < len2) {
    let arr1 = nums1[index1]
    let arr2 = nums2[index2]
    if (arr1[0] === arr2[0]) {
      resArr.push([arr1[0], arr1[1] + arr2[1]])
      index1++
      index2++
    } else if (arr1[0] < arr2[0]) {
      resArr.push(arr1)
      index1++
    } else {
      resArr.push(arr2)
      index2++
    }
  }
  console.log(nums1[index1++], nums2[index2++])
  while (index1 < len1) {
    resArr.push(nums1[index1++])
  }
  while (index2 < len2) {
    resArr.push(nums2[index2++])
  }
  return resArr
}
const nums1 = [[2,4],[3,6],[5,5]], nums2 = [[1,3],[4,3]]
const res = mergeArrays(nums1, nums2)
console.log(res)
