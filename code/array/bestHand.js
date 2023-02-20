function bestHand(ranks, suits) {
  const suitsSet = new Set()
  for (const suit of suits) {
    suitsSet.add(suit)
  }
  if (suitsSet.size === 1) {
    return 'Flush'
  }

  const h = new Map()
  for (const rank of ranks) {
    h.set(rank, (h.get(rank) || 0) + 1)
  }
  if (h.size === 5) {
    return 'High Card'
  }
  console.log(h.values);
  console.log('aaa');
  for (const value of h.values()) {
    if (value > 2) {
      return 'Three of a Kind'
    }
  }
  return 'Pair'
}

const ranks = [13,2,3,1,9], suits = ["a","a","a","a","a"]
const res = bestHand(ranks, suits)
console.log(res)
