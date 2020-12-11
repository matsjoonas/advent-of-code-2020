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


  function visionCreator(layout, initialPosition) {
    function look(direction, position = initialPosition) {
      let rowMod = 0;
      let unitMod = 0;
      let directionX = direction[0];
      let directionY = direction[1];
      if (directionX === 'left') {
        unitMod = -1;
      }
      if (directionX === 'right') {
        unitMod = 1;
      }
      if (directionY === 'up') {
        rowMod = -1;
      }
      if (directionY === 'down') {
        rowMod = 1;
      }

      const nextPosition = {
        row: position.row + rowMod,
        unit: position.unit + unitMod,
      }
      let nextRow = layout[nextPosition.row] || [];
      let lookingAt = nextRow[nextPosition.unit];
      if (lookingAt === '.') {
        return look(direction, nextPosition);
      } else {
        return lookingAt || '';
      }
    }

    return {
      look,
    }
  }

  function getVisibleUnits(layout, row, unit) {
    const vision = visionCreator(layout, {
      row,
      unit,
    });

    return vision.look(['', 'up']) +
      vision.look(['left', 'up']) +
      vision.look(['left', '']) +
      vision.look(['left', 'down']) +
      vision.look(['', 'down']) +
      vision.look(['right', 'down']) +
      vision.look(['right', '']) +
      vision.look(['right', 'up']);

  }

  function getNexLayout(layout) {
    let newLayout = [];
    layout.forEach((row, rowIdx) => {
      if (!newLayout[rowIdx]) newLayout[rowIdx] = [];

      row.forEach((unit, unitIdx) => {
        let modifiedUnit = unit;

        const visibleUnits = getVisibleUnits(layout, rowIdx, unitIdx);
        if (unit === 'L') {
          // check for adjacent occupied seats
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
