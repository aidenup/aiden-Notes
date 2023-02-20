function minMovesToSeat(seats, students) {
  seats.sort((a, b) =>  a - b)
  students.sort((a, b) =>  a - b)
  let res = 0
  for (let i = 0; i < seats.length; i++) {
    res += Math.abs(seats[i] - students[i])
  }
  return res
}

const seats = [3,1,5], students = [2,7,4]
const res = minMovesToSeat(seats, students)
console.log(res)
