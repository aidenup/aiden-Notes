class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function maxDepth(root) {
  // 广度优先1
  // if (root === null) return 0
  // let queue = []
  // queue.push(root)
  // let ans = 0
  // while (queue.length) {
  //   let size = queue.length
  //   for (let i = 0; i < size; i++) {
  //     let node = queue.shift()
  //     if (node.left) queue.push(node.left)
  //     if (node.right) queue.push(node.right)
  //   }
  //   ans += 1
  // }
  // return ans

  // 深度优先
  // if (root === null) return 0
  // return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))

  // 递归前序
  let depth = 0
  let res = 0

  let traverse = (root) => {
    if (root === null) return
    depth++
    traverse(root.left)
    traverse(root.right)
    res = Math.max(res, depth)
    depth--
  }
  traverse(root)
  return res
}

const root = new TreeNode(3, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)))
console.log(root)
const res = maxDepth(root)
console.log(res)