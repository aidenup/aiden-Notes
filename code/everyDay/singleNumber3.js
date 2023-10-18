// 260. 只出现一次的数字 III

function singleNumber(nums) {
  const map = new Map();
  nums.forEach((item) => {
    map.set(item, (map.get(item) || 0) + 1);
  });

  const ans = [];
  for (const [num, count] of map) {
    // console.log(num, count);
    if (count === 1) {
      ans.push(num);
    }
  }

  return ans;
}

const nums = [1, 2, 1, 3, 2, 5];
const res = singleNumber(nums);
console.log(res);
