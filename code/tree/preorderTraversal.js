import { createTree } from './utils.js'
function preorderTraversal(root, res = []) {
  if (root === null) return res
  res.push(root.val)
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
  return res
}
const root = [1,null,2,3]
const res = preorderTraversal(createTree(root))
console.log(res)