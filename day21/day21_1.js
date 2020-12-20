const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n');
  console.log(input);
  return input;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

suite.test();
//suite.solve();
//suite.performance();
