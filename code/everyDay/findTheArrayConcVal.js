// 2562. 找出数组的串联值
/**
 * @param {number[]} nums
 * @return {number}
 */
var findTheArrayConcVal = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  let ans = 0;
  while (start <= end) {
    if (start === end && nums.length % 2 !== 0) {
      ans += nums[start++];
    } else {
      ans += parseInt(nums[start++].toString() + nums[end--].toString());
    }
  }
  return ans;
};

const nums = [5, 14, 13, 8, 12];
const res = findTheArrayConcVal(nums);
console.log(res);
