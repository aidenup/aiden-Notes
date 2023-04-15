class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function deleteDuplicates(head) {
  if (head === null || head.next === null) {
    return head
  }

  let pre = head
  while (pre.next) {
    if (pre.val === pre.next.val) {
      pre.next = pre.next.next
    } else {
      pre = pre.next
    }
  }

  return head
}
const head = new ListNode(1, new ListNode(1, new ListNode(2)))
let res = deleteDuplicates(head)
while(res !== null) {
  console.log(res.val)
  res = res.next
}