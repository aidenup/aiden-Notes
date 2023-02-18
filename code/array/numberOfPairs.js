function numberOfPairs(nums) {
  const set = new Set()
  let pair = 0
  for (const item of nums) {
    if (set.has(item)) {
      pair++
      set.delete(item)
    } else {
      set.add(item)
    }
  }
  return [pair, set.size]
}

console.log(numberOfPairs([1,3,2,1,3,2,2]));