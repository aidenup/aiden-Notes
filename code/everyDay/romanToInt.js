var romanToInt = function (s) {
  const table = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const sArr = s.split("");
  let ans = 0;
  for (let i = 0; i < sArr.length; i++) {
    if (
      (sArr[i] === "I" && sArr[i + 1] === "V") ||
      (sArr[i] === "I" && sArr[i + 1] === "X") ||
      (sArr[i] === "X" && sArr[i + 1] === "L") ||
      (sArr[i] === "X" && sArr[i + 1] === "C") ||
      (sArr[i] === "C" && sArr[i + 1] === "D") ||
      (sArr[i] === "C" && sArr[i + 1] === "M")
    ) {
      ans += table[sArr[i + 1]] - table[sArr[i]];
      i++;
    } else {
      ans += table[sArr[i]];
    }
  }

  return ans;
};

const s = "IV";
const res = romanToInt(s);
console.log(res);
