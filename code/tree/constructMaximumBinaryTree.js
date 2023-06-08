import { TreeNode } from "./utils.js"

function constructMaximumBinaryTree(nums) {
  if (!nums.length) {
    return null
  }

  const maxVal = Math.max(...nums)
  const maxIndex = nums.indexOf(maxVal)

  const root = new TreeNode(maxVal)

  const leftNums = nums.slice(0, maxIndex)
  const rightNums = nums.slice(maxIndex + 1)

  root.left = constructMaximumBinaryTree(leftNums)
  root.right = constructMaximumBinaryTree(rightNums)

  console.log(maxVal, maxIndex, root, leftNums, rightNums)

  return root
}

const nums = [3, 2, 1, 6, 0, 5]
const res = constructMaximumBinaryTree(nums)
console.log(res)