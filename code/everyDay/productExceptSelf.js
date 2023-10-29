/**
238. 除自身以外数组的乘积

给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const len = nums.length;
  const answer = new Array(len);

  const L = new Array(len);
  const R = new Array(len);

  L[0] = 1;
  for (let i = 1; i < len; i++) {
    L[i] = nums[i - 1] * L[i - 1];
  }

  R[len - 1] = 1;
  for (let i = len - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1];
  }

  for (let i = 0; i < len; i++) {
    answer[i] = L[i] * R[i];
  }

  console.log(L);
  console.log(R);

  return answer;
};

const nums = [1, 2, 3, 4];
const res = productExceptSelf(nums);
console.log(res);
