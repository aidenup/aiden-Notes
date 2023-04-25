class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

function getIntersectionNode(headA, headB) {
  if (headA === null || headB === null) return null
  let lA = listA, lB = listB

  while (lA !== lB) {
    lA = lA === null ? headB : lA.next
    lB = lB === null ? headA : lB.next
  }

  return lA
}
const com = new ListNode(8, new ListNode(4, new ListNode(5)))
let listA = new ListNode(4, new ListNode(1, com))
const listB = new ListNode(5, new ListNode(0, new ListNode(1, com)))

const res = getIntersectionNode(listA, listB)

console.log(res)
