// 2652. 倍数求和

var sumOfMultiples = function (n) {
  let res = 0;
  for (let i = 0; i < n + 1; i++) {
    if (i % 3 === 0) {
      res += i;
    } else if (i % 5 === 0) {
      res += i;
    } else if (i % 7 === 0) {
      res += i;
    }
  }

  return res;
};

const n = 10;
const res = sumOfMultiples(n);
console.log(res);
