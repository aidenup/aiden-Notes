class TreeNode {
  constructor(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
  }
}

let n1 = new TreeNode(1)
    n2 = new TreeNode(2)
    n3 = new TreeNode(3)
    n4 = new TreeNode(4)
    n5 = new TreeNode(5)

n1.left = n2
n1.right = n3
n2.left = n4
n2.right = n5
console.log(n1)