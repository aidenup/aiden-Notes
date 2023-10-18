// 2512. 奖励最顶尖的 K 名学生

var topStudents = function (
  positive_feedback,
  negative_feedback,
  report,
  student_id,
  k
) {
  let students = [];
  const feedbackMap = new Map();

  positive_feedback.forEach((item) => {
    feedbackMap.set(item, 3);
  });
  negative_feedback.forEach((item) => {
    feedbackMap.set(item, -1);
  });
  student_id.forEach((id, index) => {
    const reportArr = report[index].split(" ");
    let score = 0;
    for (let i = 0; i < reportArr.length; i++) {
      if (feedbackMap.has(reportArr[i])) {
        score += feedbackMap.get(reportArr[i]);
      }
    }
    students.push({
      id,
      score,
    });
  });

  students = students.sort((a, b) => {
    if (a.score === b.score) {
      return a.id - b.id;
    }
    return b.score - a.score;
  });
  console.log(students);
  return students.splice(0, k).map((item) => item.id);
};

const positive_feedback = ["smart", "brilliant", "studious"],
  negative_feedback = ["not"],
  report = ["this student is not studious", "the student is smart"],
  student_id = [1, 2],
  k = 2;

const res = topStudents(
  positive_feedback,
  negative_feedback,
  report,
  student_id,
  k
);

console.log(res);
