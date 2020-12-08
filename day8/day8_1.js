const AocSuite = require('../util/AocSuite');
const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [5],
});


function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(line => {
      const parsed = line.split(' ');
      parsed[1] = parseInt(parsed[1]);
      return parsed;
    });

  const executedInstructions = [];
  let accumulator = 0;
  let idx = 0;
  while (true) {
    if (executedInstructions.find(item => item === idx)) {
      break;
    }
    executedInstructions.push(idx);

    const instruction = input[idx][0];
    const argument = input[idx][1];

    if (instruction === 'nop') {
      idx++
    } else if (instruction === 'acc') {
      accumulator += argument;
      idx++
    } else if (instruction === 'jmp') {
      idx += argument;
    }
  }

  return accumulator;
}


suite.test();
suite.solve();
//suite.performance();
