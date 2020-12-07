const AocSuite = require('../util/AocSuite');
const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [],
});

function solver(data) {
  const input = data.toString().trim().split('\r\n');

  return null;
}

//suite.performance();
suite.test();
suite.solve();

