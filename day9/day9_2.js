const AocSuite = require('../util/AocSuite');

function solver(data) {
  const numbers = data.toString().trim().split('\r\n')
    .map(item => parseInt(item));

  const target = 90433990;
  const targetIndex = numbers.indexOf(target);
  const searchRange = numbers.slice(0, targetIndex);
  let answer;
  searchRange.forEach((number, index) => {
    let sum = 0;
    let counter = 0;
    const subSearchRange = searchRange.slice(index);
    const visitedNumbers = [];
    while (sum < target) {
      visitedNumbers.push(subSearchRange[counter]);
      sum += subSearchRange[counter];
      counter++;
    }
    if (sum === target) {
      answer = visitedNumbers;
      return visitedNumbers;
    }
  });

  const sorted = answer.sort((a,b) => a - b);
  return sorted[0] + sorted[sorted.length - 1]
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [62],
});

//suite.test();
suite.solve();
//suite.performance();
