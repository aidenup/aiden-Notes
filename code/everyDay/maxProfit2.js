// 122. 买卖股票的最佳时机 II
/**
给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
返回 你能获得的 最大 利润 。
动态规划
 */
var maxProfit = function (prices) {
  const len = prices.length;
  const dp = new Array(len).fill(0).map((v) => new Array(2).fill(0));
  (dp[0][0] = 0), (dp[0][1] = -prices[0]);

  for (let i = 1; i < len; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]);
  }

  return dp[len - 1][0];
};

const prices = [7, 1, 5, 3, 6, 4];
const res = maxProfit(prices);
console.log(res);
