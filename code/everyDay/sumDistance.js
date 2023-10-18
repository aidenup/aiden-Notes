// 2731. 移动机器人

var sumDistance = function (nums, s, d) {
  const arr = new Array(nums.length).fill(0);
  const mod = 1e9 + 7;

  for (let i = 0; i < nums.length; i++) {
    // 将d次的位置都计算出来 因为两个机器人相撞后 有穿透特性 不会分谁和谁，也就相当于两个机器人相撞后会继续往原来的方向移动
    arr[i] = s[i] === "L" ? nums[i] - d : nums[i] + d;
  }
  arr.sort((a, b) => a - b);

  let res = 0;

  for (let i = 1; i < nums.length; i++) {
    // 这个109 + 7 取余后返回 真狗
    res += ((((arr[i] - arr[i - 1]) * i) % mod) * (nums.length - i)) % mod;
    res %= mod;
  }

  return res;
};

const nums = [-2, 0, 2],
  s = "RLL",
  d = 3;

let res = sumDistance(nums, s, d);
console.log(res);
