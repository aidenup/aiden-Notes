/**
给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。
请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
 */

function searchRange(nums, target) {
  // 左右边界使用两个二分法来寻找
  function getRightBorder(nums, target) {
    let left = 0, right = nums.length - 1
    let rightBorder = -2
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      // 找左右边界关键就在这里
      // 从做到右一直找 直到找到大于target 并且之后没有target 
      if(nums[mid] > target) {
        right = mid - 1
      } else {
        left = mid + 1
        rightBorder = left
      }
    }
    return rightBorder
  }

  function getLeftBorder(nums, target) {
    let left = 0, right = nums.length - 1
    let leftBorder = -2
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (nums[mid] >= target) {
        right = mid - 1
        leftBorder = right
      } else {
        left = mid + 1
      }
    }
    return leftBorder
  }

  // 寻找左右边界的两个方法有什么不同呢?

  let leftBorder = getLeftBorder(nums, target)
  let rightBorder = getRightBorder(nums, target)

  // 情况1 target 在数组范围的左边或右边
  if (leftBorder === -2 || rightBorder === -2) return[-1, -1]
  // 情况3 target 在数组范围内 且数组中存在target 
  if (rightBorder - leftBorder > 1) return [leftBorder + 1, rightBorder - 1]
  // 情况2 target 在数组范围内 且数组中不存在 target
  return [-1, -1]
}

let nums = [5,7,7,8,8,10], target = 8

console.log(searchRange(nums, target));
console.log(3 + ((4 - 3) >> 1));