class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function mergeTwoLists(list1, list2) {
  const prehead = new ListNode(-1)
  let preval = prehead
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      preval.next = list1
      list1 = list1.next
    } else {
      preval.next = list2
      list2 = list2.next
    }
    preval = preval.next
  }
  preval.next = list1 === null ? list2 : list1
  return prehead.next
}

const l1 = new ListNode(1, new ListNode(2, new ListNode(4)))
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)))
let res = mergeTwoLists(l1, l2)
while (res.next !== null) {
  console.log(res.val)
  res = res.next
}
console.log(res.val)
