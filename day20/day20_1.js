const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim();
  console.log(input);
  return null;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
