function fairCandySwap(aliceSizes, bobSizes) {
  const mapB = {}
  const a = aliceSizes.reduce((a, b) => a + b, 0)
  const b = getBasic(bobSizes, mapB)
  const average = (a + b) / 2
  const diff = average - a

  for (let i = 0; i < aliceSizes.length; i++) {
    if (mapB[aliceSizes[i] + diff]) {
      return [aliceSizes[i], aliceSizes[i] + diff]
    }
  }
}
const aliceSizes = [1,2,5], bobSizes = [2,4]
const res = fairCandySwap(aliceSizes, bobSizes)
console.log(res)

function getBasic(arr, obj) {
  let sum = 0
  arr.forEach(item => {
    obj[item] = 1
    sum += item
  })
  return sum
}
