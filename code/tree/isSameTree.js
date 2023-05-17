import { createTree } from './utils.js'
function isSameTree(p, q) {
  const queue1 = [p]
  const queue2 = [q]

  while (queue1.length) {
    let node1 = queue1.shift()
    let node2 = queue2.shift()
    if (!node1 || !node2) {
      if (node1 !== node2) return false
      continue
    }
    if (node1.val !== node2.val) return false
    queue1.push(node1.left)
    queue1.push(node1.right)
    queue2.push(node2.left)
    queue2.push(node2.right)
  }
  return true
}

const p = [1,2,3], q = [1,2,3]
const res = isSameTree(createTree(p), createTree(q))
console.log(res)
