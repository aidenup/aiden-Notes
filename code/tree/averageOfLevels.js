import { createTree } from "./utils.js"
function averageOfLevels(root) {
  if (root === null) return
  const res = []
  const queue = [root]
  while (queue.length) {
    let size = queue.length
    let list = []
    for (let i = 0; i < size; i++) {
      let node = queue.shift()
      list.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    res.push(average(list))
  }
  return res
}
function average(arr) {
  let count = 0, len = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === null) continue
    len++
    count += arr[i]
  }
  return count / len
}
const root = [3, 9, 20, null, null, 15, 7]
const res = averageOfLevels(createTree(root))
console.log(res)
