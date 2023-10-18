// 169. 多数元素

var majorityElement = function (nums) {
  const mid = Math.floor(nums.length / 2);
  return nums.sort((a, b) => a - b)[mid];
};

const nums = [3, 2, 3];
const res = majorityElement(nums);
console.log(res);
