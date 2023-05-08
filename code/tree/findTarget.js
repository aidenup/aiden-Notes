import { createTree } from './utils.js'
function findTarget(root, k) {
  // const set = new Set()
  // const helper = (root, k) => {
  //   if (!root) {
  //     return false
  //   }
  //   if (set.has(k - root.val)) {
  //     return true
  //   }
  //   set.add(root.val)
  //   return helper(root.left, k) || helper(root.right, k)
  // }
  // return helper(root, k)
  const set = new Set()
  const queue = [root]
  while(queue.length) {
    const node = queue.shift()
    if (set.has(k - node.val)) {
      return true
    }
    set.add(node.val)
    if (node.left) {
      queue.push(node.left)
    }
    if (node.right) {
      queue.push(node.right)
    }
  }
  return false
}

const root = [8,6,10,5,7,9,11], k = 12
const res = findTarget(createTree(root), k)
console.log(res)
