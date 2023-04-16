class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function reversePrint(head) {
  let prehead = null
  let res = []
  while (head !== null) {
    let tmp = head.next
    head.next = prehead
    prehead = head
    head = tmp
  }
  while (prehead !== null) {
    res.push(prehead.val)
    prehead = prehead.next
  }
  return res
}

const head = new ListNode(1, new ListNode(3, new ListNode(2)))
console.log(reversePrint(head))
