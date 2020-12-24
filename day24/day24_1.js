const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

const directionsMap = {
  e: [1, -1, 0],
  w: [-1, 1, 0],
  ne: [1, 0, -1],
  nw: [0, 1, -1],
  se: [0, -1, 1],
  sw: [-1, 0, 1],
}

function step(a, b) {
  return a.map((coord, index) => coord + b[index]);
}

function pointToString(point) {
  return point[0] + '_' + point[1] + '_' + point[2];
}

function stringToPoint(str) {
  return str.split('_').map(value => parseInt(value, 10));
}

function solver(data) {
  let input = parseInput(data)
    .map(line => line.map(d => directionsMap[d]));

  const tileValues = {};
  input.map(line => line.reduce(step, [0, 0, 0]))
    .forEach(tileCoords => {
      let key = pointToString(tileCoords);
      tileValues[key] = !tileValues[key];
    });

  return Object.values(tileValues).reduce((acc, cur) => cur ? acc + 1 : acc, 0);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [10],
});

//suite.test();
suite.solve();
//suite.performance();
