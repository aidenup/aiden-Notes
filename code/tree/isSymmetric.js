import { createTree } from './utils.js'
function isSymmetric(root) {
  if (root === null) return true

  const queue = [root.left, root.right]
  while (queue.length) {
    let leftNode = queue.shift()
    let rightNode = queue.shift()
    if (leftNode === null && rightNode === null) {
      continue
    }
    if (leftNode === null || rightNode === null || leftNode.val !== rightNode.val) {
      return false
    }

    queue.push(leftNode.left)
    queue.push(rightNode.right)
    queue.push(leftNode.right)
    queue.push(rightNode.left)
  }
  return true
}
const root = [1,2,2,3,4,4,3]
const res = isSymmetric(createTree(root))
console.log(res)