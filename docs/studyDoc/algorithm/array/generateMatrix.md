给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。

**示例1**
![render pipeline](./../images/spiraln.jpg)
```
输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
```

**示例2**
```
输入：n = 1
输出：[[1]]
```

模拟顺时针画矩阵的过程:
+ 填充上行从左到右
+ 填充右列从上到下
+ 填充下行从右到左
+ 填充左列从下到上


**确定边界由外向内一圈一圈这么画下去， 坚持了每条边左闭右开的原则**

#### js 版本
```js
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
```

#### Rust 版本
```Rust
impl Solution {
    pub fn generate_matrix(n: i32) -> Vec<Vec<i32>> {
        let mut res = vec![vec![0; n as usize]; n as usize];
        let (mut startX, mut startY) = (0, 0);
        let mut loopIdx = n / 2;
        let mid: usize = loopIdx as usize;
        let mut offset = 1;
        let mut count = 1;
        let (mut i, mut j): (usize, usize) = (0, 0);
        while loopIdx > 0 {
            i = startX;
            j = startY;

            while j < (startY + (n as usize) - offset)  {
                res[i][j] = count;
                count+=1;
                j += 1;
            }

            while i < (startX + (n as usize) - offset) {
                res[i][j] = count;
                count+=1;
                i += 1;
            }

            while j > startY {
                res[i][j] = count;
                count+=1;
                j -= 1;
            }
            while i > startX {
                res[i][j] = count;
                count+=1;
                i -= 1;
            }

            startX += 1;
            startY += 1;
            offset += 2;
            loopIdx -=1 ;
        }
        if n % 2 == 1 {
            res[mid][mid] = count;
        }
        res
    }
}
```