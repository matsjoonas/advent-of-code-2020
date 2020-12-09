const AocSuite = require('../util/AocSuite');

function solver(data) {
  const numbers = data.toString().trim().split('\r\n').map(item => parseInt(item));

  function isSum(numbers, target) {
    let isFound = false;
    numbers.forEach(number => {
      if (numbers.indexOf(target - number) !== -1) {
        isFound = true;
      }
    });
    return isFound;
  }

  const preambleLength = 25;
  const rangeLength = 25;
  let match;
  for (let i = preambleLength; i < numbers.length; i++) {
    if (!isSum(numbers.slice(i - rangeLength, i), numbers[i])) {
      match = numbers[i];
      break;
    }
  }

  return match;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [127],
});

//suite.test();
suite.solve();
suite.performance();
