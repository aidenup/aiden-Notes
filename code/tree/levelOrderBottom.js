import { createTree } from "./utils.js"

function levelOrderBottom(root) {
  if (!root) return []
  const queue = [root]
  let list = []
  while (queue.length) {
    const size = queue.length
    let subList = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (node.val !== null) {
        subList.push(node.val)
      }
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    list.unshift(subList)
  }
  return list
}

const root = [3, 9, 20, null, null, 15, 7]
const res = levelOrderBottom(createTree(root))
console.log(res)