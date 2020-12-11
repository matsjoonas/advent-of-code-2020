const AocSuite = require('../util/AocSuite');

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

  function getAdjacentUnits(layout, rowIdx, unitIdx) {
    let adjacentUnits = '';
    let topRow = layout[rowIdx - 1] || [];
    let middleRow = layout[rowIdx] || [];
    let bottomRow = layout[rowIdx + 1] || [];
    adjacentUnits += topRow[unitIdx - 1] || '' // top left
    adjacentUnits += topRow[unitIdx] || '' // top center
    adjacentUnits += topRow[unitIdx + 1] || '' // top right
    adjacentUnits += middleRow[unitIdx - 1] || '' // left
    adjacentUnits += middleRow[unitIdx + 1] || '' // right
    adjacentUnits += bottomRow[unitIdx - 1] || '' // bottom left
    adjacentUnits += bottomRow[unitIdx] || '' // bottom center
    adjacentUnits += bottomRow[unitIdx + 1] || '' // bottom right
    return adjacentUnits;
  }

  function getNexLayout(layout) {
    let newLayout = [];
    layout.forEach((row, rowIdx) => {
      if (!newLayout[rowIdx]) newLayout[rowIdx] = [];

      row.forEach((unit, unitIdx) => {
        let modifiedUnit = unit;
        if (unit === 'L') {
          // check for adjacent occupied seats
          if (!getAdjacentUnits(layout, rowIdx, unitIdx).includes('#')) {
            modifiedUnit = '#';
          }
        } else if (unit === '#') {
          if (getAdjacentUnits(layout, rowIdx, unitIdx).split("#").length-1 >= 4) {
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
  

  return convertToString(frames[frames.length - 1]).split("#").length-1;

}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
