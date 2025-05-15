const averageGrade = (person) => {
  return person.grades
    .reduce((acc, cur, index, array) => {
      const numberOfGrades = array.length;
      const currentScore = Number(cur.score); // Convert to number

      if (!Number(currentScore)) {
        // Check if the currentScore is a number
        return acc;
      }

      if (numberOfGrades === index + 1) {
        // Check if it's the last element
        return (acc + currentScore) / numberOfGrades;
      }

      return acc + currentScore; // Accumulate the score
    }, 0)
    .toFixed(2); // Return the average grade with 2 decimal places
};

module.exports = averageGrade;
