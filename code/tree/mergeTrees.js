import { createTree } from './utils.js'

function mergeTrees(root1, root2) {
  // if (root1 === null && root2) {
  //   return root2
  // }
  // if ((root2 === null && root1) || (root1 === null && root2 === null)) {
  //   return root1
  // }
  // root1.val += root2.val

  // root1.left = mergeTrees(root1.left, root2.left)
  // root1.right = mergeTrees(root1.right, root2.right)
  // return root1

  
}

const root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
const res = mergeTrees(createTree(root1), createTree(root2))

