# 有序数组的平方
给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

**示例 1：**
```
输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
```

**示例 2：**
```
输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]
```

### 双指针法
数组是有序的，但是负数平方之后可能成为最大数了

数组平方的最大值就在数组的两端，不是最左端就是在最右端，不可能在中间。

此时该考虑使用双指针法了，i 指向起始位置，j 指向数组终止位置。

如果 A[i] * A[i] < A[j] 8 A[j] 那么result[k--] = A[j] * A[j]

如果 A[i] * A[i] > = A[j] * A[j] 那么 result[k--] = A[i] * A[i]

#### javascript 版本
```js
function sortedSquares(nums) {
  let len = nums.length
  let res = new Array(len).fill(0)
  let i = 0, j = len - 1, k = len - 1
  while(i <= j) {
    let left = nums[i] * nums[i],
        right = nums[j] * nums[j]
    if(left < right) {
      res[k--] = right
      j--
    } else {
      res[k--] = left
      i++
    }
  }
  return res
}
```

#### Rust 版本
``` Rust
impl Solution {
    pub fn sorted_squares(nums: Vec<i32>) -> Vec<i32> {
        let len = nums.len();
        let (mut i, mut j, mut k) = (0, len - 1, len - 1);
        let mut ans = vec![0;len];
        while i <= j {
            if nums[i] * nums[i] < nums[j] * nums[j] {
                ans[k] = nums[j] * nums[j];
                j -= 1;
            } else {
                ans[k] = nums[i] * nums[i];
                i += 1;
            }
            k -= 1;
        }
        ans
    }
}
```
