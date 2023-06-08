import { createTree } from "./utils.js"

function findDuplicateSubtrees(root) {
  const seen = new Map()
  const repeat = new Set()

  const helper = (node) => {
    if (!node) {
      return ''
    }
    let str = ''
    str += node.val
    str += '('
    str += helper(node.left)
    str += ')('
    str += helper(node.right)
    str += ')'
    console.log(str)
    if (seen.has(str)) {
      repeat.add(seen.get(str))
    } else {
      seen.set(str, node)
    }
    return str
  }
  helper(root)
  return [...repeat]
}

const root = createTree([1, 2, 3, 4, null, 2, 4, null, null, 4])
const res = findDuplicateSubtrees(root)
console.log(res)