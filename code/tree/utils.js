export class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

export class Node {
  constructor(val, children) {
    this.val = val
    this.children = children
  }
}
export function createTree(arr) {
  if (arr.length === 0 || !arr) {
    return null
  }

  const root = new TreeNode(arr.shift())
  const nodeQueue = [root]
  while (arr.length > 0) {
    let node = nodeQueue.shift()
    if (!arr.length) {
      break
    }
    let left = new TreeNode(arr.shift())

    node.left = left
    nodeQueue.push(left)

    if (!arr.length) {
      break
    }
    let right = new TreeNode(arr.shift())
    node.right = right
    nodeQueue.push(right)
  }
  return root
}