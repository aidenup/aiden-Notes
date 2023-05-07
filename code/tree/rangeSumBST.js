class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

function rangeSumBST(root, low, high) {
  if (!root) {
    return 0
  }
  if (root.val > high) {
    return rangeSumBST(root.left, low, high)
  }
  if (root.val < low) {
    return rangeSumBST(root.right, low, high)
  }
  debugger
  return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
}
// [10,5,15,3,7,null,18]
const root = new TreeNode(10, new TreeNode(5, new TreeNode(3, null, null), new TreeNode(7, null, null)), new TreeNode(15, null, new TreeNode(18, null, null)))
const low = 7, high = 15

const res = rangeSumBST(root, low, high)
console.log(res)