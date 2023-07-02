import { createTree } from './utils.js'
function deepestLeavesSum(root) {
  let maxLevel = -1
  let sum = 0
  const dfs = (node, level) => {
    if (!node) {
      return
    }
    if (level > maxLevel) {
      maxLevel = level
      sum = node.val
    } else if (level === maxLevel) {
      sum += node.val
    }
    dfs(node.left, level + 1)
    dfs(node.right, level + 1)
  }
  dfs(root, 0)
  return sum
}

function deepestLeavesSum2(root) {
  let sum = 0
  const queue = [root]
  while (queue.length) {
    sum = 0
    const size = queue.length
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      sum += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return sum
}

const root = [1, 2, 3, 4, 5, null, 6, 7, null, null, null, null, 8]
const res = deepestLeavesSum2(createTree(root))
console.log(res)