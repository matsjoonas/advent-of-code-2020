const AocSuite = require('../util/AocSuite');
const Grid = require('../util/Grid');
const snapshot = require('./snapshot');


function solver(data) {
  const layout = data.toString().trim().split('\r\n')
    .map(row => row.split(''));

  function convertToString(layout) {
    return layout.map(row => {
      return row.join();
    }).join();
  }

  function areLayoutsEqual(a, b) {
    return convertToString(a) === convertToString(b);
  }

  const lookingDirections = [
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
  ];

  function getVisibleUnits(grid, position, lookingDirections) {
    return lookingDirections.reduce((acc, direction) => {
      return acc + grid.look(direction, position);
    }, '');
  }

  function getNexLayout(layout) {
    let newLayout = [];
    const grid = new Grid({
      grid: layout,
      lineOfSightBlockers: ['#', 'L'],
    });

    layout.forEach((row, rowIdx) => {
      if (!newLayout[rowIdx]) newLayout[rowIdx] = [];

      row.forEach((unit, unitIdx) => {
        let modifiedUnit = unit;

        const visibleUnits = getVisibleUnits(grid, [unitIdx, rowIdx], lookingDirections);
        if (unit === 'L') {
          // check for visible occupied seats
          if (!visibleUnits.includes('#')) {
            modifiedUnit = '#';
          }
        } else if (unit === '#') {
          if (visibleUnits.split("#").length - 1 >= 5) {
            modifiedUnit = 'L';
          }
        }
        newLayout[rowIdx].push(modifiedUnit);
      });
    });

    return newLayout;
  }


  const frames = [];
  let prevLayout;
  let nextLayout;
  do {
    prevLayout = frames[frames.length - 1] || layout;
    nextLayout = getNexLayout(prevLayout);
    frames.push(nextLayout);
  } while (!areLayoutsEqual(prevLayout, nextLayout));

  snapshot(frames[frames.length - 1]);

  return convertToString(frames[frames.length - 1]).split("#").length-1;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
