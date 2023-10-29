/*
274. H 指数
给你一个整数数组 citations ，其中 citations[i] 表示研究者的第 i 篇论文被引用的次数。计算并返回该研究者的 h 指数。
根据维基百科上 h 指数的定义：h 代表“高引用次数” ，一名科研人员的 h 指数 是指他（她）至少发表了 h 篇论文，并且每篇论文 至少 被引用 h 次。如果 h 有多种可能的值，h 指数 是其中最大的那个。
*/

/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  //   let h = 0,
  //     index = citations.length;
  //   citations.sort((a, b) => a - b);
  //   while (index-- && citations[index] > h) {
  //     h++;
  //   }
  //   return h;

  // 二分
  let left = 0,
    right = citations.length;

  while (left < right) {
    let mid = Math.floor((left + right + 1) / 2);
    let cnt = 0;
    for (let s of citations) {
      if (s >= mid) {
        cnt += 1;
      }
    }
    if (cnt >= mid) {
      left = mid;
    } else {
      right = mid + 1;
    }
  }
  return left;
};

const citations = [3, 0, 6, 1, 5];

const res = hIndex(citations);
console.log(res);
