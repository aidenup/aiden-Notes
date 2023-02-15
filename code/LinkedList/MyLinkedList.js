// get(index)：获取链表中第 index 个节点的值。如果索引无效，则返回-1。
// addAtHead(val)：在链表的第一个元素之前添加一个值为 val 的节点。插入后，新节点将成为链表的第一个节点。
// addAtTail(val)：将值为 val 的节点追加到链表的最后一个元素。
// addAtIndex(index,val)：在链表中的第 index 个节点之前添加值为 val  的节点。如果 index 等于链表的长度，则该节点将附加到链表的末尾。如果 index 大于链表长度，则不会插入节点。如果index小于0，则在头部插入节点。
// deleteAtIndex(index)：如果索引 index 有效，则删除链表中的第 index 个节点。

class LinkNode {
  constructor(val, next) {
    this.val = val
    this.next = next
  }

  displayList(head) {
    if(!head) return null
    console.log(head.val)
    this.displayList(head.next)
  }
}

var MyLinkedList = function() {
  this._size = 0
  this._head = null
  this._tail = null
};

MyLinkedList.prototype.getNode = function(index) {
  if (index < 0 || index >= this._size) return null
  // 创建虚拟头结点
  let cur = new LinkNode(0, this._head)
  // 0 -> head
  while (index-- >= 0) {
    cur = cur.next
  }
  return cur
}

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (index < 0 || index >= this._size) return -1
  return this.getNode(index).val
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  const node = new LinkNode(val, this._head)
  this._head = node
  this._size++
  if (!this._tail) {
    this._tail = node
  }
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  const node = new ListNode(val, null)
  this._size++
  if (this._tail) {
    this._tail.next = node
    this._tail = node
    return
  }
  this._tail = node
  this._head = node
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index > this._size) return
  if (index <= 0) {
    this.addAtHead(val)
    return
  }
  if (index === this._size) {
    this.addAtTail(val)
    return
  }
  // 获取目标结点的上一个结点
  const node = this.getNode(index - 1)
  node.next = new LinkNode(val, node.next)
  this._size++
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0 || index >= this._size) return
  if (index === 0) {
    this._head = this._head.next
    // 如果删除的这个节点同时是尾节点，要处理尾节点
    if (index === this._size - 1) {
      this._tail = this._head
    }
    this._size--
    return
  }

  const node = this.getNode(index - 1)
  node.next = node.next.next

  if (index === this._size - 1) {
    this._tail = node
  }
  this._size--
};
module.exports.LinkNode = LinkNode
module.exports.MyLinkedList = MyLinkedList
/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */