import { createTree } from './utils.js'

function sumOfLeftLeaves(root) {
  if (root === null) return null
  let queue = [root]
  let sum = 0
  while(queue.length) {
    let node = queue.shift()
    if (node.left !== null && node.left.left === null && node.left.right === null) {
      sum += node.left.val
    }
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
  return sum
}
const root = [3,9,20,null,null,15,7] 
const res = sumOfLeftLeaves(createTree(root))
console.log(res)