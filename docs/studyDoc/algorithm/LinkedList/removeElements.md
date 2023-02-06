给你一个链表的头节点 head 和一个整数 val ，请你删除链表中所有满足 Node.val == val 的节点，并返回 新的头节点 。

**示例1**
![removeElements img](https://assets.leetcode.com/uploads/2021/03/06/removelinked-list.jpg)
```
输入：head = [1,2,6,3,4,5,6], val = 6
输出：[1,2,3,4,5]
```

**示例2**
```
输入：head = [], val = 1
输出：[]
```

**示例3**
```
输入：head = [7,7,7,7], val = 7
输出：[]
```

::: code-group
``` js [javascript]
class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
const n0 = new ListNode(1)
const n1 = new ListNode(2)
const n2 = new ListNode(6)
const n3 = new ListNode(3)
const n4 = new ListNode(4)
const n5 = new ListNode(5)
const n6 = new ListNode(6)

n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4
n4.next = n5
n5.next = n6
n6.next = null


function removeElements(head, val) {
  let dummyHead = new ListNode(0, head)
  let pre = dummyHead, cur = dummyHead.next
  while(cur) {
    if (cur.val === val) {
      pre.next = cur.next
    } else {
      pre = cur
    }
    cur = cur.next
  }
  return dummyHead.next
}
let newHead = removeElements(n0)
while(newHead.next) {
  console.log(newHead.val);
  newHead = newHead.next
}

```
:::