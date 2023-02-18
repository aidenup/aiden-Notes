function finalValueAfterOperations(operations) {
  let x = 0
  for (const item of operations) {
    x += item.includes('+') ? 1 : -1
  }
  return x
}

const operations = ["--X","X++","X++"]
const res = finalValueAfterOperations(operations)
console.log(res);
