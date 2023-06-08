import { createTree } from './utils.js'
function zigzagLevelOrder(root) {
  if (!root) return []
  const queue = [root]
  const list = []
  let isOrderLeft = true

  while (queue.length) {
    let size = queue.length
    list.push([])
    for (let i = 1; i <= size; i++) {
      const node = queue.shift()
      if (isOrderLeft) {
        list[list.length - 1].push(node.val)
      } else {
        list[list.length - 1].unshift(node.val)
      }
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    isOrderLeft = !isOrderLeft
  }
  return list
}

const root = [1, 2]
const res = zigzagLevelOrder(createTree(root))
console.log(res)