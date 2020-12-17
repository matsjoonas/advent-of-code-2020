const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(point => point.split(''));

  // 1 2 3
  // 1 2 4
  // 1 2 2
  // we know it is a neighbour when the diff is 1
  const gridPoints = new Map();

  function pointToString(point) {
    return point[0] + '_' + point[1] + '_' + point[2];
  }

  function stringToPoint(str) {
    return str.split('_').map(value => parseInt(value, 10));
  }

  input.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === '#') {
        // we're only interested in the active cubes
        gridPoints.set(pointToString([0, y, x]), '#');
      }
    });
  });

  function getNeighbours(point) {
    const z = point[0];
    const y = point[1];
    const x = point[2];
    let newPoints = [];

    for (let zDiff = -1; zDiff <= 1; zDiff++) {
      for (let yDiff = -1; yDiff <= 1; yDiff++) {
        for (let xDiff = -1; xDiff <= 1; xDiff++) {
          if (zDiff === 0 && yDiff === 0 && xDiff === 0) {
            continue;
          }
          newPoints.push([z + zDiff, y + yDiff, x + xDiff])
        }
      }
    }

    console.log(newPoints.length);
    return newPoints;
  }


  function expand(gridPoints) {
    const newPoints = new Map();
    gridPoints.forEach((value, key) => {
      const neighbours = getNeighbours(stringToPoint(key));
      newPoints.set(key, value);
      neighbours.forEach((point) => {
        const key = pointToString(point);
        if (!newPoints.get(key)) {
          newPoints.set(key, '.');
        }
      });
    });

    return newPoints;
  }

  function getNewStateForPoint(point, state, gridPoints) {
    let activeNeighbours = 0;
    let newState;
    const neighbours = getNeighbours(point);
    for (let i = 0; i < neighbours.length; i++) {
      if (gridPoints.get(pointToString(neighbours[i])) === '#') {
        activeNeighbours++;
      }
    }

    if (state === '.' && activeNeighbours === 3) {
      newState = '#';
    } else if (state === '#') {
      if (activeNeighbours >= 2 && activeNeighbours <= 3) {
        newState = '#';
      } else {
        newState = '.';
      }
    }
    return newState || state;
  }

  function removeInactive(gridPoints) {
    const newGrid = new Map();
    gridPoints.forEach((value, key) => {
      if (value === '#') {
        newGrid.set(key, value);
      }
    });
    return newGrid;
  }

  function getNewFrame(gridPoints) {
    const expandedGrid = expand(gridPoints);
    const newGrid = new Map();
    expandedGrid.forEach((value, key) => {
      const point = stringToPoint(key);
      newGrid.set(key, getNewStateForPoint(point, value, expandedGrid));
    });

    return removeInactive(newGrid);
  }

  let currentFrame = gridPoints;
  for (let i = 0; i < 6; i++) {
    currentFrame = getNewFrame(currentFrame);
  }

  return currentFrame.size;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [112],
});

//suite.test();
suite.solve();
//suite.performance();
