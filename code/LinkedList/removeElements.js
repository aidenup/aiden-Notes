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
