import { createTree } from './utils.js'
function isBalanced(root) {
  if (!root) return true
  const maxHeight = (root) => {
    if (!root) return 0
    return Math.max(maxHeight(root.left), maxHeight(root.right)) + 1
  }
  return isBalanced(root.left) && isBalanced(root.left) && Math.abs(maxHeight(root.left) - maxHeight(root.right)) <= 1
}

const root = [3, 9, 20, null, null, 15, 7]
const res = isBalanced(createTree(root))
console.log(res)