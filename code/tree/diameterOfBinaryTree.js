import { createTree } from "./utils.js"

function diameterOfBinaryTree(root) {
  let res = 1
  const depth = (node) => {
    if (node === null) return 0
    const leftNode = depth(node.left)
    const rightNode = depth(node.right)
    res = Math.max(res, leftNode + rightNode + 1)
    return Math.max(leftNode, rightNode) + 1
  }
  depth(root)
  return res - 1
}

const root = [1, 2, 3, 4, 5]
const res = diameterOfBinaryTree(createTree(root))
console.log(res)