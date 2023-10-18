// 137. 只出现一次的数字 II

var singleNumber = function (nums) {
  //   const map = new Map();
  //   for (const item of nums) {
  //     map.set(item, (map.get(item) || 0) + 1);
  //   }
  //   const ans = [];
  //   for (const [num, count] of map) {
  //     if (count === 1) {
  //       ans.push(num);
  //     }
  //   }
  // //   console.log(map);
  //   return ans;

  let ans = 0;
  for (let i = 0; i < 32; i++) {
    let total = 0;
    for (const num of nums) {
      total += (num >> i) & 1;
    }
    if (total % 3 !== 0) {
      ans |= 1 << i;
    }
  }

  return ans;
};

const nums = [2, 2, 3, 2];

const res = singleNumber(nums);
console.log(res);
