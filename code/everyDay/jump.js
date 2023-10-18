// 45. 跳跃游戏 II

/**
给定一个长度为 n 的 0 索引整数数组 nums。初始位置为 nums[0]。
每个元素 nums[i] 表示从索引 i 向前跳转的最大长度。换句话说，如果你在 nums[i] 处，你可以跳转到任意 nums[i + j] 处:
*/

var jump = function (nums) {
  let currentIndex = nums.length - 1;
  let step = 0;

  while (currentIndex > 0) {
    for (let i = 0; i < currentIndex; i++) {
      if (nums[i] + i >= currentIndex) {
        currentIndex = i;
        step++;
      }
    }
  }

  return step;
};

const nums = [2, 3, 1, 1, 4];
const res = jump(nums);
console.log(res);
