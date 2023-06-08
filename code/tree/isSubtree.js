function isSubtree(root, subRoot) {
  if (root === null) return false
  return check(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)
}

function check(root, subRoot) {
  if (root === null && subRoot === null) return true
  if (root === null || subRoot === null) return false
  if (root.val === b.val) {
    return check(root.left, subRoot.left) && check(root.right, subRoot.right)
  }
  return false
}