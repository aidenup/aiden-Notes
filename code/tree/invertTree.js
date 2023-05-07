import { createTree } from './utils.js'
function invertTree(root) {
  if (root === null) return null
  // const left = invertTree(root.left)
  // const right = invertTree(root.right)
  // root.left = right
  // root.right = left
  // return root

  const queue = [root]
  while (queue.length) {
    const cur = queue.shift()

    let temp = cur.left
    cur.left = cur.right
    cur.right = temp

    if (cur.left) {
      queue.push(cur.left)
    }
    if (cur.right) {
      queue.push(cur.right)
    }
  }
  return root
}

const root = [4,2,7,1,3,6,9]
const res = invertTree(createTree(root))
console.log(res)