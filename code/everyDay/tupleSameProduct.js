var tupleSameProduct = function (nums) {
  const len = nums.length;
  const map = new Map();

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const key = nums[i] * nums[j];
      map.set(key, (map.get(key) || 0) + 1);
    }
  }
  let ans = 0;
  for (const val of map.values()) {
    ans += val * (val - 1) * 4;
  }

  return ans;
};

const nums = [2, 3, 4, 6];
const res = tupleSameProduct(nums);
console.log(res);
