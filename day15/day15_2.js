const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(line => line.split(',').map(item => parseInt(item, 10)) )[0];

  const cache = new Map();
  input.forEach((item, idx) => {
    cache.set(item, idx);
  });
  let lastNumber;
  for (let i = input.length - 1; i < 29999999; i++) {
    if (lastNumber === undefined) {
      lastNumber = input[i];
    }

    const prevIndex = cache.get(lastNumber);
    cache.set(lastNumber, i)

    let newNumber = 0;
    if (prevIndex !== undefined) {
      newNumber = i - prevIndex;
    }
    lastNumber = newNumber;
  }


  return lastNumber;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [175594],
});

//suite.test();
suite.solve();
//suite.performance();
