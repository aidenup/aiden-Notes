function mostWordsFound(sentences) {
  let maxLen = 0
  for (let i = 0; i < sentences.length; i++) {
    let strArr = sentences[i].split(' ')
    maxLen = strArr.length > maxLen ? strArr.length : maxLen
  }
  return maxLen
}

const sentences = ["alice and bob love leetcode", "i think so too", "this is great thanks very much"]
const res = mostWordsFound(sentences)
console.log(res)
