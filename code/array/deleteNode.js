class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
function deleteNode(head, val) {
  let dmy = new ListNode(0, head)
  let pre = dmy, cur = head
  while (cur !== null) {
    if (cur.val === val) {
      pre.next = cur.next
      break
    }
    pre = cur
    cur = cur.next
  }
  return dmy.next
}

const head = new ListNode(4, new ListNode(5, new ListNode(1, new ListNode(9))))
const val = 5
console.log(deleteNode(head, val))
