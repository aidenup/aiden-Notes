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
