// 14. 最长公共前缀
/*
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

输入：strs = ["flower","flow","flight"]
输出："fl"

*/
var longestCommonPrefix = function (strs) {
  if (!strs || !strs.length) return "";

  let fixArr = strs[0];
  for (let i = 1; i < strs.length; i++) {
    fixArr = lcp(fixArr, strs[i]);
    if (fixArr.length === 0) {
      break;
    }
  }
  return fixArr;
};

function lcp(str1, str2) {
  const len = Math.min(str1.length, str2.length);
  let index = 0;
  while (index < len && str1.chatAt(index) === str2.chatAt(index)) {
    index++;
  }
  return str1.subString(0, index);
}
