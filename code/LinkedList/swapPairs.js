const LinkNode = require('./MyLinkedList').LinkNode

const linkNode = new LinkNode(1,new LinkNode(2, new LinkNode(3, new LinkNode(4, null))))
console.log(linkNode.displayList(linkNode))


var swapPairs = function(head) {
  let ret = new LinkNode(0, head), temp = ret
  while (temp.next && temp.next.next) {
    let cur = temp.next.next, pre = temp.next
    pre.next = cur.next
    cur.next = pre
    temp.next = cur
    temp = pre
  }
  return ret.next
};

let res = swapPairs(linkNode)

console.log(res.displayList(res))