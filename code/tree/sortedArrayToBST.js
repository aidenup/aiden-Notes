import { TreeNode } from './utils.js'

function sortedArrayToBST(nums) {
  let mid = nums.length >> 1
  const root = new TreeNode(nums[mid])
  let left = mid - 1, right = mid + 1
  if (left >= 0) {
    root.left = sortedArrayToBST(nums.slice(0, mid))
  }

  if (right < nums.length) {
    root.right = sortedArrayToBST(nums.slice(right))
  }

  return root
}
const nums = [-10,-3,0,5,9] 
// const nums = [1,3]
const res = sortedArrayToBST(nums)
console.log(res)