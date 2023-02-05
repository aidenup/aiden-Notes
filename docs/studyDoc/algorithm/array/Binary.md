# 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索nums 中的 target，如果目标值存在返回下标，否则返回 -1

示例 1:
```txt
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4 
```

#### 左闭右闭区间 [left, right]
第一种写法：定义target 在[left, right] 左闭右闭的区间里
+ while(left <= right) 因为left == right 是有意义的
+ if(nums[mid] > right) right 要赋值为mid - 1, nums[mid] 不一定是right 
+ mid 如果数组个数是奇数的话 就直接算出中间的下标， 如果是偶数的话，就需要个数除以2 - 1
```js
function search(nums, target) {
  let mid, left = 0, right = nums.length - 1
  while(left <= right) {
    mid = left + ((right - left) >> 1)
    if(nums[mid] > target) {
      right = mid - 1
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
```

#### 左闭右开区间 [left, right)
第二种方法:target 是在一个在左闭右开的区间里，也就是[left, right) ，那么二分法的边界处理就会不一样
``` js
function search(nums, target) {
  let left = 0, right = nums.length // 这里right 相当于 ... right)
  while(left < right) {  // 因为是[left, right) 所以这里 left == right是无效的， 是不用执行的
    let mid = left + ((right - left) >> 1) // 这里不变 还是找的中间
    if(nums[mid] > right) {
      right = mid // target 在左区间，在[left, middle)中
    } else if (nums[mid] < target) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
```


#### rust 版本 
``` rust
impl Solution {
    pub fn search(nums: Vec<i32>, target: i32) -> i32 {
        let mut left = 0 as i32;
        let mut right = (nums.len() - 1) as i32;
        let mut mid = 0;
        while left <= right {
            mid = left + ((right - left) >> 1);
            if *nums.get(mid as usize).unwrap() >target {
                right = mid - 1;
            } else if *nums.get(mid as usize).unwrap() < target {
                left = mid + 1;
            } else {
                return mid as i32;
            }
        }
        return -1;
    }
}
```

## 相关题目

### 搜索插入位置
给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

**示例1**
```
输入: nums = [1,3,5,6], target = 5
输出: 2
```
**示例2**
```
输入: nums = [1,3,5,6], target = 2
输出: 1
```
**示例3**
```
输入: nums = [1,3,5,6], target = 7
输出: 4
```

> 这里的时间复杂度要求为O(log n)，需要使用二分查找

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let left = 0, right = nums.length - 1
    while(left <= right) {
        let mid = left + ((right - left) >> 1)
        if (nums[mid] == target) {
            return mid
        } else if (nums[mid] > target) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return left
};
```

```Rust
impl Solution {
    pub fn search_insert(nums: Vec<i32>, target: i32) -> i32 {
        let (mut left, mut right) = (0, nums.len() - 1);
        while left <= right {
            let mid = left + ((right - left) >> 1);
            if nums[mid] == target {
                return ((left + right) / 2 )as i32;
            } else if nums[mid] > target {
                if mid == 0 {
                    break;
                }
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return left as i32
    }
}
```


### 在排序数组中查找元素的第一个和最后一个位置
给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。


**示例 1:**
```
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
```

**示例 2：**
```
输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
```
**示例 3：**
```
输入：nums = [], target = 0
输出：[-1,-1]
```