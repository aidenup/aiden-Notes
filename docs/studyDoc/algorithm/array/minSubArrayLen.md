给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

**示例 1：**
```
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
```

**示例 2：**
```
输入：target = 4, nums = [1,4,4]
输出：1
```

**示例 3：**
```
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
```
### 滑动窗口
定义两个指针start 和 end 分别代表滑动窗口的窗口的开始位置和结束位置，维护变量sum 存储子数组中的元素和（nums[start]...nums[end]）

初始状态下，start 和 end 都指向下标 0 ，nums 的值为 0

每一次最外层循环，将nums[end] 加到 sum, 如果 sum >= target 了，则更新子数组的最小长度（滑动窗口的长度 end - start + 1）, 然后将nums[start] 从 sum 中减去并将start 右移， 直到sum < target ,在此过程中，同样更新子数组的最小长度，在每一轮迭代的最后，将end 右移。


#### js 版本
```js
function minSubArrayLen(target, nums) {
  let start = 0
  let res = nums.length + 1
  let tempRes = 0
  let sum = 0
  for (let end = 0; end < nums.length; end++) {
    sum += nums[end]
    while(sum >= target) {
      tempRes = end - start + 1
      res = tempRes < res ? tempRes : res
      sum -= nums[start++]
    }
  }
  return res > nums.length ? 0 : res
}
```
#### Rust 版本
```Rust
impl Solution {
    pub fn min_sub_array_len(target: i32, nums: Vec<i32>) -> i32 {
        let (mut res, mut subLen): (i32, i32) = (i32::MAX, 0);
        let (mut sum, mut start) = (0, 0);

        for (pos, val) in nums.iter().enumerate() {
            sum += val;
            while sum >= target {
                subLen = (pos - start + 1) as i32;
                if res > subLen {
                    res = subLen;
                }
                sum -= nums[start];
                start += 1;
            }
        }
        if res == i32::MAX {
            return 0;
        }
        res
    }
}
```
