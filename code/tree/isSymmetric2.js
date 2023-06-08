import { createTree } from "./utils.js"

function check(u, v) {
  const queue = [u, v]
  while (queue.length) {
    u = queue.shift()
    v = queue.shift()
    if (!u && !v) continue
    if ((!u || !v) || (u.val !== v.val)) return false
    queue.push(u.left)
    queue.push(v.right)
    queue.push(u.right)
    queue.push(v.left)
  }
  return true
}
function isSymmetric(root) {
  return check(root, root)
}
const root = [1, 2, 2, 3, 4, 4, 3]
const res = isSymmetric(createTree(root))
console.log(res)