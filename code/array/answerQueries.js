function answerQueries(nums, queries) {
  nums.sort((a, b) => a - b)
  let pre = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    pre[i] = pre[i - 1] + nums[i]
  }
  console.log(pre)

  let resArr = []

  for (let i = 0; i < queries.length; i++) {
    let left = 0, right = pre.length - 1
    while (left <= right) {
      let mid = left + ((right - left) >> 1)
      if (pre[mid] > queries[i]) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    resArr.push(left)
  }
  return resArr
}

const nums = [4,5,2,1], queries = [3,10,21]
const res = answerQueries(nums, queries)
console.log(res)
