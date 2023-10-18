// 26. 删除有序数组中的重复项

var removeDuplicates = function (nums) {
  const len = nums.length;
  if (!len) return 0;
  let index = 1;
  for (let i = 1; i < len; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[index] = num[i];
      index++;
    }
  }
  return index;
};

const nums = [1, 1, 2];
const res = removeElement(nums);
console.log(res);
