const AocSuite = require('../util/AocSuite');

function solver(data) {
  const numbers = data.toString().trim().split('\r\n')
    .map(item => parseInt(item));

  // takes an array of numbers and from those numbers (starting from 0)
  // returns a contiguous range of numbers that sum to target
  function numbersThatSumTo(inputNumbers, targetSum) {
    let sum = 0;
    let i = 0;
    const outputNumbers = [];
    while (sum < targetSum) {
      outputNumbers.push(inputNumbers[i]);
      sum += inputNumbers[i];
      i++;
    }
    if (sum === targetSum) {
      return outputNumbers;
    } else {
      return false;
    }
  }

  const targetSum = 90433990;
  // we are only interested in the numbers that come before the targetSum
  const searchScope = numbers.slice(0, numbers.indexOf(targetSum));
  let foundNumbers;
  // find a contiguous range of numbers that sum to targetSum
  searchScope.some((number, index) => {
    const result = numbersThatSumTo(searchScope.slice(index), targetSum);
    if (result) {
      foundNumbers = result;
      return true;
    }
  });

  // the final answer is the sum of the smallest and largest number
  const sorted = foundNumbers.sort((a,b) => a - b);
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
