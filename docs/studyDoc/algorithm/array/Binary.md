给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索nums 中的 target，如果目标值存在返回下标，否则返回 -1

示例 1:
```txt
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4 
```

左闭右闭区间 [left, right]
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
nums = [-1,0,3,5,9,12], target = 9
console.log(search(nums, target))
```