import { createTree } from './utils.js'
function minDepth(root) {
  if (root === null) return 0
  if (root.left && root.right) {
    return 1 + Math.min(minDepth(root.left), minDepth(root.right))
  } else if (root.left) {
    return 1 + minDepth(root.left)
  } else if (root.right) {
    return 1 + minDepth(root.right)
  } else {
    return 1
  }
}

const root = [3,9,20,null,null,15,7]
const res = minDepth(createTree(root))
console.log(res)