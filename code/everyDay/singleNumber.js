// 136. 只出现一次的数字

var singleNumber = function (nums) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    ans ^= nums[i];
  }
  return ans;
};

const nums = [2, 2, 1];
const res = singleNumber(nums);
console.log(res);
