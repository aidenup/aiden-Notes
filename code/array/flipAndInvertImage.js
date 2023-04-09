function flipAndInvertImage(image) {
  const len = image.length
  for (let i = 0; i < len; i++) {
    let left = 0, right = len - 1
    while (left < right) {
      if (image[i][left] === image[i][right]) {
        image[i][left] ^= 1
        image[i][right] ^= 1
      }
      left++
      right--
    }
    if (left === right) {
      image[i][left] ^= 1
    }
  }
  return image
}
const image = [[1,1,0],[1,0,1],[0,0,0]]
let res = flipAndInvertImage(image)
console.log(res)

