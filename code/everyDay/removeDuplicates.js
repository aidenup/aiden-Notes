// 80. 删除有序数组中的重复项 II

var removeDuplicates = function (nums) {
  const len = nums.length;
  if (len <= 2) return len;
  let index = 2,
    dup = 2;
  while (dup < len) {
    if (nums[index - 2] !== nums[dup]) {
      nums[index] = nums[dup];
      index++;
    }
    dup++;
  }
  return index;
};

const nums = [1, 1, 1, 2, 2, 3];
const res = removeDuplicates(nums);
console.log(res);
