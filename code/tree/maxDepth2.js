import { createTree } from './utils.js'
function maxDepth(root) {
  let res = 0
  let queue = [root]
  while (queue.length) {
    let size = queue.length 
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res+=1
  }
  return res
}
const root = [3,9,20,null,null,15,7]
const res = maxDepth(createTree(root))
console.log(res)