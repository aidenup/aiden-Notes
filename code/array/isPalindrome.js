class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
function isPalindrome(head) {
  let arr = []
  while (head !== null) {
    arr.push(head.val)
    head = head.next
  }
  let left = 0, right = arr.length - 1
  while (left < right) {
    if (arr[left++] !== arr[right--]) {
      return false
    }
  }
  return true
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(3, new ListNode(new ListNode(2, new ListNode(1)))))))
console.log(isPalindrome(head))
