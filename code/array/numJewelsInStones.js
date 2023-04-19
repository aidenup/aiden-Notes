function numJewelsInStones(jewels, stones) {
  let jewelsList = new Set(jewels.split(''))
  let res = 0
  for (let i = 0; i < stones.length; i++) {
    console.log(res, i, stones[i], jewelsList.has(stones[i]))
    res += jewelsList.has(stones[i])
  }
  return res
}
const jewels = "aA", stones = "aAAbbbb"
const res = numJewelsInStones(jewels, stones)
console.log(res)
