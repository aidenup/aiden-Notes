import { Node } from './utils.js'

function postorder(root) {
  const res = []
  helper(root, res)
  return res
}

function helper(root, res) {
  if (root == null) return
  for (const ch of root.children) {
    helper(ch, res)
  }
  res.push(root.val)
}

const root = [1,null,3,2,4,null,5,6]
const res = postorder(createTree(root))
console.log(res)
