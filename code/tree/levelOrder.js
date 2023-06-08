import { createTree } from './utils.js'
function levelOrder(root) {
  if (!root) return []
  const queue = [root]
  const list = []
  while (queue.length) {
    const size = queue.length
    list.push([])

    for (let i = 1; i <= size; i++) {
      const node = queue.shift()
      list[list.length - 1].push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return list
}

const root = [3, 9, 20, null, null, 15, 7]
const res = levelOrder(createTree(root))
console.log(res)