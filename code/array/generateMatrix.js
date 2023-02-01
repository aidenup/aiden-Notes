function generateMatrix(n) {
  let startX = 0, startY = 0 // 起始位置
  let loop = Math.floor(n / 2) // 旋转圈数
  let mid = Math.floor(n/ 2) // 中间位置
  let offset = 1 // 控制每一层填充元素个数
  let count = 1 // 更新填充数字
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0)) // 初始化矩阵

  while (loop--) {
    let row = startX, col = startY
    console.log(row, col);
    // 上行从左到右（左闭右开）
    for (; col < startY + n - offset; col++) {
      res[row][col] = count++
    }
    // 右列从上到下（左闭右开）
    for (; row < startX + n - offset; row++) {
      res[row][col] = count++
    }
    // 下行从右到左（左闭右开）
    for (; col > startY; col--) {
      res[row][col] = count++
    }
    // 左列左下到上（左闭右开）
    for (; row > startX; row--) {
      res[row][col] = count++
    }
    // 一圈结束更新起始位置
    startX++
    startY++
    // 一圈结束更新起始位置
    offset+=2
  }

  // 如果n 是奇数 那么最后的count 就是最中间的数
  if(n % 2 === 1) {
    res[mid][mid] = count
  }
  return res
}
console.log(generateMatrix(5));