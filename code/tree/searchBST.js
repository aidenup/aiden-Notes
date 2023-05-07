import { createTree } from './utils.js'
function searchBST(root, val) {
  if (root === null) return null
  if (root.val === val) {
    return root
  }

  return searchBST(val < root.val ? root.left : root.right, val)

  // while (root) {
  //   if (val === root.val) {
  //     return root
  //   }
  //   root = val < root.val ? root.left : root.right
  // }
  // return null
}
const root = [4,2,7,1,3], val = 2
const res = searchBST(createTree(root), val)
console.log(res)