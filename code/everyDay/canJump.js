// 55. 跳跃游戏
/**
给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。

 */
var canJump = function (nums) {
  let maxJumpIndex = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= maxJumpIndex) {
      maxJumpIndex = Math.max(maxJumpIndex, nums[i] + i);
      if (maxJumpIndex >= nums.length - 1) return true;
    } else {
      return false;
    }
  }
};

const nums = [2, 3, 1, 1, 4];
const res = canJump(nums);
console.log(res);
