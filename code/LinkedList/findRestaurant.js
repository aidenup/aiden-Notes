function findRestaurant(list1, list2) {
  const map = new Map()
  for (let i = 0; i < list1.length; i++) {
    map.set(list1[i], i)
  }
  let res = [], max = Number.MAX_VALUE

  for (let i = 0; i < list2.length; i++) {
    if (map.has(list2[i])) {
      const index = map.get(list2[i])
      if (i + index < max) {
        max = i + index
        res.length = 0
        res.push(list2[i])
      } else if (i + index === max) {
        res.push(list2[i])
      }
    }
  }
  return res
}
const list1 = ["happy","sad","good"]
const list2 = ["sad","happy","good"]
const res = findRestaurant(list1, list2)
console.log(res)