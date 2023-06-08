import { createTree } from './utils.js'
function getMinimumDifference(root) {
  let ans = Number.MAX_SAFE_INTEGER, pre = -1
  const helper = (root) => {
    if (root === null) return
    helper(root.left)
    if (pre === -1) {
      pre = root.val
    } else {
      ans = Math.min(ans, root.val - pre)
      pre = root.val
    }
    helper(root.right)
  }
  helper(root)
  return ans
}
const root = [4, 2, 6, 1, 3]
const res = getMinimumDifference(createTree(root))
console.log(res)
