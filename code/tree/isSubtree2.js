import { createTree } from "./utils.js"

function findSecondMinimumValue(root) {
  let res = -1

  const rootValue = root.val
  const dfs = (node) => {
    if (node === null) return
    if (res !== -1 && node.val >= res) {
      return
    }
    if (node.val > rootValue) {
      res = node.val
    }
    dfs(node.left)
    dfs(node.right)
  }

  dfs(root)
  return res
}

const root = [2, 2, 5, null, null, 5, 7]
const res = findSecondMinimumValue(createTree(root))
console.log(res)