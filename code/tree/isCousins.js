import { createTree } from './utils.js'
function isCousins(root, x, y) {
  if (root === null) return false
  const queue = [root]
  let x_parent = null, y_parent = null
  while (queue.length) {
    let size = queue.shift()
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (node.left) {
        if (!x_parent) {
          x_parent = node.left.val === x ? node : null
        }
        if (!y_parent) {
          y_parent = node.left.val === y ? node : null
        }
        queue.push(node.left)
      }
      if (node.right) {
        if (!x_parent) {
          x_parent = node.right.val === x ? node : null
        }
        if (!y_parent) {
          y_parent = node.right.val === y ? node : null
        }
        queue.push(node.right)
      }
    }
    if ((x_parent === null) ^ (y_parent === null)) {
      return false
    }
  }
}
const root = [1, 2, 3, null, 4, null, 5], x = 5, y = 4
const res = isCousins(createTree(root), x, y)
console.log(res)