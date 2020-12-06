const AocSuite = require('../util/AocSuite');
const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [],
});

//suite.performance();
//suite.test();
suite.solve();

function solver(data) {
  const input = data.toString().trim().split('\r\n');

  console.log(input);

  return null;
}


