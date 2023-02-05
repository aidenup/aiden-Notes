「链表 Linked List」是一种线性数据结构，其中每个元素都是单独的对象，各个元素（一般称为结点）之间通过指针连接。由于结点中记录了连接关系，因此链表的存储方式相比于数组更加灵活，系统不必保证内存地址的连续性。

链表的「结点 Node」包含两项数据，一是结点「值 Value」，二是指向下一结点的「指针 Pointer」（或称「引用 Reference」）。

### 链表的定义
::: code-group
```js [javascript]
class ListNode {
  val
  next
  constructor(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
  }
}
```
```ts [typescript]
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}
:::
```

### 链表的初始化
建立链表分为两步，第一步是初始化各个结点对象，第二步是构建引用指向关系。完成后，即可以从链表的首个结点（即头结点）出发，访问其余所有的结点。

> 我们通常将头结点当作链表的代称，例如头结点 head 和链表 head 实际上是同义的。

```js
// 初始化链表 1 -> 3 -> 2 -> 5 -> 4
// 初始化各个结点
const n0 = new ListNode(1)
const n1 = new ListNode(3)
const n2 = new ListNode(2)
const n3 = new ListNode(5)
const n4 = new ListNode(4)

// 结构引用指向
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4
```

### 链表的优点
在链表中，插入与删除结点的操作效率高。例如，如果想在链表中间的两个结点 A , B 之间插入一个新结点 P ，我们只需要改变两个结点指针即可，时间复杂度为 
 ，相比数组的插入操作高效很多。在链表中删除某个结点也很方便，只需要改变一个结点指针即可。

**在链表中插入或删除节点**
::: code-group
```js [javascript]
/* 在链表的结点 n0 之后插入结点 P */
function insert(n0, P) {
    let n1 = n0.next;
    n0.next = P;
    P.next = n1;
}

/* 删除链表的结点 n0 之后的首个结点 */
function remove(n0) {
    if (!n0.next)
        return;
    // n0 -> P -> n1
    let P = n0.next;
    let n1 = P.next;
    n0.next = n1;
}

```
```ts [typescript]
/* 在链表的结点 n0 之后插入结点 P */
function insert(n0: ListNode, P: ListNode): void {
    const n1 = n0.next;
    n0.next = P;
    P.next = n1;
}

/* 删除链表的结点 n0 之后的首个结点 */
function remove(n0: ListNode): void {
    if (!n0.next) {
        return;
    }
    // n0 -> P -> n1
    const P = n0.next;
    const n1 = P.next;
    n0.next = n1;
}

```
:::

### 链表的缺点
链表访问结点效率低。上节提到，数组可以在 
时间下访问任意元素，但链表无法直接访问任意结点。这是因为计算机需要从头结点出发，一个一个地向后遍历到目标结点。例如，倘若想要访问链表索引为 index （即第 index + 1 个）的结点，那么需要 index 次访问操作。

::: code-group
```js [javascript]
/* 访问链表中索引为 index 的结点 */
function access(head, index) {
    for (let i = 0; i < index; i++) {
        if (!head)
            return null;
        head = head.next;
    }
    return head;
}
```
```ts [typescript]
/* 访问链表中索引为 index 的结点 */
function access(head: ListNode | null, index: number): ListNode | null {
    for (let i = 0; i < index; i++) {
        if (!head) {
            return null;
        }
        head = head.next;
    }
    return head;
}
```
:::
链表的内存占用多。链表以结点为单位，每个结点除了保存值外，还需额外保存指针（引用）。这意味着同样数据量下，链表比数组需要占用更多内存空间。

### 链表常用操作
遍历链表查找。遍历链表，查找链表内值为 target 的结点，输出结点在链表中的索引。

::: code-group
```js [javascript]
/* 在链表中查找值为 target 的首个结点 */
function find(head, target) {
    let index = 0;
    while (head !== null) {
        if (head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}
```
```ts [typescript]
/* 在链表中查找值为 target 的首个结点 */
function find(head: ListNode | null, target: number): number {
    let index = 0;
    while (head !== null) {
        if (head.val === target) {
            return index;
        }
        head = head.next;
        index += 1;
    }
    return -1;
}

```
:::

### 常见链表类型
**单向链表**。即上述介绍的普通链表。单向链表的结点有「值」和指向下一结点的「指针（引用）」两项数据。我们将首个结点称为头结点，尾结点指向 null 。
**环形链表**。如果我们令单向链表的尾结点指向头结点（即首尾相接），则得到一个环形链表。在环形链表中，我们可以将任意结点看作是头结点。
**双向链表**。单向链表仅记录了一个方向的指针（引用），在双向链表的结点定义中，同时有指向下一结点（后继结点）和上一结点（前驱结点）的「指针（引用）」。双向链表相对于单向链表更加灵活，即可以朝两个方向遍历链表，但也需要占用更多的内存空间。

双向列表结点类
::: code-group
```js [javascript]
/* 双向链表结点类 */
class ListNode {
    val;
    next;
    prev;
    constructor(val, next) {
        this.val = val  ===  undefined ? 0 : val;        // 结点值
        this.next = next  ===  undefined ? null : next;  // 指向后继结点的指针（引用）
        this.prev = prev  ===  undefined ? null : prev;  // 指向前驱结点的指针（引用）
    }
}
```
```ts [typescript]
/* 双向链表结点类 */
class ListNode {
    val: number;
    next: ListNode | null;
    prev: ListNode | null;
    constructor(val?: number, next?: ListNode | null, prev?: ListNode | null) {
        this.val = val  ===  undefined ? 0 : val;        // 结点值
        this.next = next  ===  undefined ? null : next;  // 指向后继结点的指针（引用）
        this.prev = prev  ===  undefined ? null : prev;  // 指向前驱结点的指针（引用）
    }
}
```
:::