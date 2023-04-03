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
    if (words[mid] === '') {
      let l = mid - 1, r = mid + 1
      while(true) {
        if (l < left && r > right) {
          return -1
        } else if (l >= left && words[l] !== '') {
          mid = l
          break
        } else if (r < right && words[r] !== '') {
          mid = r
          break
        }
      }
    } else {
      if (words[mid] === s) {
        return mid
      } else if (words[mid] < s) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }
  return -1
};

const words =  ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""], s = "ball"
console.log(findString(words, s))
