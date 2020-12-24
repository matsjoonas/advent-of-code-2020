const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function removeNegatingDirections(a = [], b = []) {
  const longer = a.length > b.length ? a : b;
  const diff = Math.abs(a.length - b.length);
  return longer.slice(0, diff);
}

function getDirectionGroups(directions) {
  const processedDirections = [];
  const directionGroups = {};

  directions.forEach(thisDirection => {
    if (processedDirections.includes(thisDirection)) {
      return;
    }
    processedDirections.push(thisDirection);
    directionGroups[thisDirection] = directions.filter(direction => direction === thisDirection);
  });
  return directionGroups;
}

function simplyfyWith(a = [], b = [], value) {
  const longer = a.length > b.length ? a : b;
  const diff = Math.abs(a.length - b.length);
  return longer.map((item, index) => {
    if (index < diff) {
      return item;
    } else {
      return value;
    }
  });
}

function minPath(item) {
  let directionGroups = getDirectionGroups(item);

  const modPath = [
    ...(directionGroups.e || []),
    ...(directionGroups.w || []),
    ...simplyfyWith(directionGroups.se, directionGroups.ne, 'e'),
    ...simplyfyWith(directionGroups.nw, directionGroups.sw, 'w'),
  ];

  directionGroups = getDirectionGroups(modPath);


  const newPath = [
    ...removeNegatingDirections(directionGroups.w, directionGroups.e),
    ...removeNegatingDirections(directionGroups.se, directionGroups.nw),
    ...removeNegatingDirections(directionGroups.ne, directionGroups.sw),
  ];

  return newPath;
}

function solver(data) {
  let input = parseInput(data);

  const minPaths = input.map(minPath).map(line => {
    return line.sort().join('');
  });

  const visitCount = {};
  minPaths.forEach(path => {
    if (!visitCount[path]) {
      visitCount[path] = 1;
    } else {
      visitCount[path] = visitCount[path] + 1;
    }
  });

  console.log(visitCount);
  
  return null;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [10],
});

suite.test();
//suite.solve();
//suite.performance();
