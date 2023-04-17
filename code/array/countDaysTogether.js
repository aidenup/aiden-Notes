function countDaysTogether(arriveAlice, leaveAlice, arriveBob, leaveBob) {
  const monthNum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]

  const aliceStart = monthNum[arriveAlice.split('-')[0] - 1] + (+arriveAlice.split('-')[1])
  const aliceEnd = monthNum[leaveAlice.split('-')[0] - 1] + (+leaveAlice.split('-')[1])

  const bobStart = monthNum[arriveBob.split('-')[0] - 1] + (+arriveBob.split('-')[1])
  const bobEnd = monthNum[leaveBob.split('-')[0] - 1] + (+leaveBob.split('-')[1])

  if (bobStart > aliceEnd || aliceStart > bobEnd) {
    return 0
  } else if (bobStart >= aliceStart && bobStart <= aliceEnd) {
    if (bobEnd <= aliceEnd) {
      return bobEnd - bobStart + 1
    } else {
      return aliceEnd - bobStart + 1
    }
  } else {
    if (aliceEnd <= bobEnd) {
      return aliceEnd - aliceStart + 1
    } else {
      return bobEnd - aliceStart + 1
    }
  }
}

// const arriveAlice = "10-01", leaveAlice = "10-31", arriveBob = "11-01", leaveBob = "12-31"
const arriveAlice = "08-15", leaveAlice = "08-18", arriveBob = "08-16", leaveBob = "08-19"
const res = countDaysTogether(arriveAlice, leaveAlice, arriveBob, leaveBob)
console.log(res)