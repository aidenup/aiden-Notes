import { createTree } from './utils.js'
function hasPathSum(root, targetSum) {
  if (root === null) return 0
  // let res = false
  // const helper = (root, sum) => {
  //   if (root === null) return
  //   if (sum === targetSum && (!root.left && !root.right)) {
  //     res = true
  //   }
  //   if (root.left) helper(root.left, sum + root.left.val)
  //   if (root.right) helper(root.right, sum + root.right.val)
  // }
  // helper(root, root.val)
  // return res
  const stack = [[root, root.val]]
  while (stack.length) {
    const [node, val] = stack.shift()
    if (val === targetSum && (!node.left && !node.right)) return true
    node.left && stack.push([node.left, val + node.left.val])
    node.right && stack.push([node.right, val + node.right.val])
  }
  return false
}
const root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22
const res = hasPathSum(createTree(root), targetSum)
console.log(res)