import { createTree } from "./utils.js"

function minDiffInBST(root) {
  if (root === null) return -1
  const queue = [root], res = []
  while (queue.length) {
    const node = queue.shift()
    res.push(node.val)
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
  res.sort((a, b) => a - b)
  let minNum = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < res.length; i++) {
    if (res[i + 1] - res[i] < minNum) {
      minNum = res[i + 1] - res[i]
    }
  }
  return minNum
}
const root = [4, 2, 6, 1, 3]
const res = minDiffInBST(createTree(root))
console.log(res)