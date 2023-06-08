import { createTree } from './utils.js'
function addOneRow(root, val, depth) {
  // if (root === null) return
  // if (depth === 1) {
  //   return new TreeNode(val, root.left, null)
  // }
  // if (depth === 2) {
  //   root.left = TreeNode(val, root.left, null)
  //   root.right = TreeNode(val, null, root.right)
  // } else {
  //   root.left = addOneRow(root.left, val, depth - 1)
  //   root.right = addOneRow(root.right, val, depth - 1)
  // }
  // return root
  if (depth === 1) {
    return new TreeNode(val, root, null)
  }
  let queue = [root]
  for (let i = 1; i < depth - 1; i++) {
    const tmp = []
    for (const node of queue) {
      node.left && tmp.push(node.left)
      node.right && tmp.push(node.right)
    }
    queue = tmp
  }
  for (const node of queue) {
    node.left = new TreeNode(val, node.left, null)
    node.right = new TreeNode(val, null, node.right)
  }
  return root
}

const root = [4, 2, 6, 3, 1, 5], val = 1, depth = 3
const res = addOneRow(createTree(root), val, depth)
console.log(res)
