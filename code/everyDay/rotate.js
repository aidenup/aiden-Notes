// 189. 轮转数组

var rotate = function (nums, k) {
  while (k--) {
    const ext = nums[nums.length - 1];
    nums = [ext, ...nums.slice(0, nums.length - 1)];
  }
  console.log("cc", nums);
  return nums;
};

const nums = [1, 2, 3, 4, 5, 6, 7],
  k = 3;

const res = rotate(nums, k);
console.log(res);
