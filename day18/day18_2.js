const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n');
  
  // https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods
  function calculateLine(line) {
    let modifiedLine = '((' + line + '))';
    modifiedLine = modifiedLine.split('+').join(')+(')
      .split('*').join('))*((');
    return eval(modifiedLine);
  }

  return input.reduce((acc, line) => {
    acc = acc + calculateLine(line);
    return acc;
  }, 0);


}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
