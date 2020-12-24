const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function solver(data) {
  let input = parseInput(data);
  console.log(input);
  return null;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

suite.test();
//suite.solve();
//suite.performance();
