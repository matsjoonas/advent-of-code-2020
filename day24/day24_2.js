const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function solver(data) {
  let input = parseInput(data);

  return null;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [10],
});

suite.test();
//suite.solve();
//suite.performance();
