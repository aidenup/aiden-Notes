function findTilt(root) {
  let res = 0
  const helper = (node) => {
    if (node === null) return 0
    const sumLeft = helper(node.left)
    const sumRight = helper(node.right)
    res += Math.abs(sumLeft - sumRight)
    return sumLeft + sumRight + node.val
  }
  helper(root)
  return res
}