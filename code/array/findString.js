/**
 * @param {string[]} words
 * @param {string} s
 * @return {number}
 */
var findString = function(words, s) {
  let left = 0, right = words.length - 1
  let mid = 0
  while(left <= right) {
    mid = left + ((right - left) >> 1)
    while(mid > left && words[mid] === '') mid--
    if (words[mid] === s) {
      return mid
    } else if (words[mid] < s) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
};

const words =  ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], s = "ball"
console.log(findString(words, s))
