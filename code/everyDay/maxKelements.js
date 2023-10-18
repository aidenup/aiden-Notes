// 2530. 执行 K 次操作后的最大分数

/**
给你一个下标从 0 开始的整数数组 nums 和一个整数 k 。你的 起始分数 为 0 。

在一步 操作 中：

选出一个满足 0 <= i < nums.length 的下标 i ，
将你的 分数 增加 nums[i] ，并且
将 nums[i] 替换为 ceil(nums[i] / 3) 。
返回在 恰好 执行 k 次操作后，你可能获得的最大分数。

向上取整函数 ceil(val) 的结果是大于或等于 val 的最小整数。


 */

class MyMaxPriorityQueue {
  constructor() {
    this.queue = [];
  }

  // 入队
  enqueue(v) {
    this.queue.push(v);
    this.swim(this.size() - 1);
  }

  // 出队
  dequeue() {
    if (this.size() === 0) throw new Error("Priority queue is empty!");
    this.swap(0, this.size() - 1);
    const v = this.queue.pop();
    this.sink(0);
    return v;
  }

  // 上滤
  swim(i) {
    const val = this.queue[i];
    while (i !== 0 && val > this.queue[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  // 下滤
  sink(i) {
    const { queue, left, right } = this;
    const val = queue[i];
    const leftVal = (i) => queue[left(i)] || 0;
    const rightVal = (i) => queue[right(i)] || 0;
    while (
      (queue[left(i)] || queue[right(i)]) &&
      val < Math.max(leftVal(i), rightVal(i))
    ) {
      const next = leftVal(i) > rightVal(i) ? left(i) : right(i);
      this.swap(i, next);
      i = next;
    }
  }

  // 交换下标对应元素
  swap(i, j) {
    const { queue } = this;
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }

  // 父节点下标
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  // 左子节点下标
  left(i) {
    return 2 * i + 1;
  }

  // 右子节点下标
  right(i) {
    return 2 * i + 2;
  }

  // 节点数
  size() {
    return this.queue.length;
  }
}

var maxKelements = function (nums, k) {
  let ans = 0;
  const q = new MyMaxPriorityQueue();
  for (let v of nums) q.enqueue(v);
  while (q.size() > 0 && k-- > 0) {
    const val = q.dequeue();
    ans += val;
    q.enqueue(Math.ceil(val / 3));
  }
  return ans;
};

const nums = [1, 10, 3, 3, 3],
  k = 3;

const res = maxKelements(nums, k);
console.log(res);
