class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}

const n0 = new ListNode(1);
const n1 = new ListNode(2);
const n2 = new ListNode(3);
const n3 = new ListNode(4);
const n4 = new ListNode(5);
n0.next = n1;
n1.next = n2;
n2.next = n3;
n3.next = n4;

function displayList(head) {
  if (!head) {
    return
  }
  console.log(head.val)
  displayList(head.next)
}

// 双指针
var reverseList = function(head) {
  if (!head || !head.next) return head
  let temp = null, pre = null, cur = head
  while(cur) {
    temp = cur.next
    cur.next = pre
    pre = cur
    cur = temp
  }
  return pre
};

// 递归
var reverse = function(pre, head) {
  if (!head) return pre
  const temp = head.next
  head.next = pre
  pre = head
  return reverse(pre, temp)
}

const reverList = reverse(null, n0)
displayList(reverList)