import { createTree, TreeNode } from './utils.js'

function increasingBST(root) {
  const res = []
  inorder(root, res)
  const dummyNode = new TreeNode(-1)
  let curNode = dummyNode
  for (const value of res) {
    curNode.right = new TreeNode(value)
    curNode = curNode.right
  }
  return dummyNode.right
}

function inorder(node, res) {
  if (!node) return
  inorder(node.left, res)
  res.push(node.val)
  inorder(node.right, res)
}

const root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
const res = increasingBST(createTree(root))
console.log(res)