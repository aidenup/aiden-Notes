// 2578. 最小和分割
var splitNum = function (num) {
  let str = num.toString();
  let strArr = str.split("").sort((a, b) => a - b);
  let l = "",
    r = "";
  strArr.forEach((item, index) => {
    if (index % 2 === 0) {
      console.log(item, l);
      l += item;
    } else {
      console.log(item, r);
      r += item;
    }
  });

  return +l + +r;
};

const num = 4325;
splitNum(num);
