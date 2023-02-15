## 两两交换链表中的节点

给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

**示例 1:**
```
输入：head = [1,2,3,4]
输出：[2,1,4,3]
```

**示例 2:**
```
输入：head = []
输出：[]
```

**示例** 3：
```
输入：head = [1]
输出：[1]
```

:::code-group
```js
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
```
:::