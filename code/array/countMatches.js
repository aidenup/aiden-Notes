function countMatches(items, ruleKey, ruleValue) {
  let count = 0, idx
  switch (ruleKey) {
    case 'type':
      idx = 0
      break
    case 'color':
      idx = 1
      break
    case 'name':
      idx = 2
      break
  }
  for (let i = 0; i < items.length; i++) {
    if (items[i][idx] === ruleValue) {
      count++
    }
  }
  return count
}

const items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], 
ruleKey = "color",
ruleValue = "silver"
const res = countMatches(items, ruleKey, ruleValue)
console.log(res)
