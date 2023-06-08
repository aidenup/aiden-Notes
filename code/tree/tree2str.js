import { createTree } from './utils.js'
function tree2str(root) {
  // if (root === null) return ''
  // if (root.left === null && root.right === null) {
  //   return '' + root.val
  // }
  // if (root.right === null) {
  //   return root.val + '(' + tree2str(root.left) + ')'
  // }
  // return root.val + '(' + tree2str(root.left) + ')(' + tree2str(root.right) + ')'

  let res = ''
  const queue = [root]
  const vis = new Set()
  while (queue.length) {
    const node = queue[queue.length - 1]
    if (vis.has(node)) {
      if (node !== root) {
        res += ')'
      }
      queue.pop()
    } else {
      vis.add(node)
      if (node !== root) {
        res += '('
      }
      res += '' + node.val
      if (!node.left && node.right) {
        res += '()'
      }
      node.right && queue.push(node.right)
      node.left && queue.push(node.left)
    }
  }
  return res
}

const root = [1, 2, 3, 4]
const res = tree2str(createTree(root))
console.log(res)
