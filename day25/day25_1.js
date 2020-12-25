const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');


function transform(subjectNumber, value = 1) {
  return (value * subjectNumber) % 20201227;
}

function findLoopSize(publicKey, subjectNumber) {
  let currentValue = 1;
  let count = 0;
  while (currentValue !== publicKey) {
    currentValue = transform(subjectNumber, currentValue);
    count++;
  }
  return count;
}

function calculateKey(subjectNumber, loopSize) {
  let value;
  for (let i = 0; i < loopSize; i++) {
    value = transform(subjectNumber, value);
  }
  return value;
}

function solver(data) {
  let input = parseInput(data);
  const cardPublicKey = input[0];
  const doorPublicKey = input[1];
  return calculateKey(doorPublicKey, findLoopSize(cardPublicKey, 7));
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
