const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(line => line.split(',').map(item => parseInt(item, 10)) );

  const memory = [...input[0]];
  for (let i = memory.length - 1; i < 2020; i++) {
    const lastNumber = memory.pop();
    const prevIndex = memory.lastIndexOf(lastNumber);
    memory.push(lastNumber);

    if (prevIndex === -1) {
      memory.push(0);
    } else {
      memory.push(i - prevIndex);
    }
  }

  return memory[memory.length - 2];
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [436],
  //expectedTestAnswers: [436, 1, 10, 27, 78, 438, 1836],
});

//suite.test();
suite.solve();
//suite.performance();
