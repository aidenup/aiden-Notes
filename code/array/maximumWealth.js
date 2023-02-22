function maximumWealth(accounts) {
  let max = -1;
  for (let i = 0; i < accounts.length; i++) {
    max = Math.max(max, accounts[i].reduce((a, b) => a + b))
  }
  return max
}

const accounts = [[1,2,3],[3,2,1]]
const res = maximumWealth(accounts)
console.log(res)
