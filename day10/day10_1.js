const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(item => parseInt(item))
    .sort((a, b) => a - b);


  const joltCounter = [];
  let prev = 0;
  input.forEach(adapter => {
    let difference = adapter - prev;
    let currentValue =  joltCounter[difference] || 0;
    joltCounter[difference] = currentValue + difference;
    prev = adapter;
  });
  
  return joltCounter[1] * ((joltCounter[3] / 3) + 1);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
