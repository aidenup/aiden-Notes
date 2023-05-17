import { createTree } from './utils.js'
function findMode(root) {
  let base = 0, count = 0, maxCount = 0
  let answer = []
  const update = (x) => {
    if (x === base) {
      ++count
    } else {
      count = 1
      base = x
    }
    if (count === maxCount) {
      answer.push(base)
    }
    if (count > maxCount) {
      maxCount = count
      answer = [base]
    }
  }
  const dfs = (o) => {
    if (!o) {
      return
    }
    dfs(o.left)
    update(o.val)
    dfs(o.right)
  }
  dfs(root)
  return answer
}
const root = [1,null,2,2]
const res = findMode(createTree(root))
console.log(res)
