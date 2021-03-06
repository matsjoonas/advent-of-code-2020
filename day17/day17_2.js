const AocSuite = require('../util/AocSuite');

function pointToString(point) {
  return point.join('_');
}

function stringToPoint(str) {
  return str.split('_').map(value => parseInt(value, 10));
}

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(point => point.split(''));

  const gridPoints = new Map();

  input.forEach((row, y) => {
    row.forEach((col, x) => {
      if (col === '#') {
        // we're only interested in the active cubes
        gridPoints.set(pointToString([0, 0, y, x]), '#');
      }
    });
  });

  function getNeighbours(point) {
    const w = point[0];
    const z = point[1];
    const y = point[2];
    const x = point[3];
    let newPoints = [];
    for (let wDiff = -1; wDiff <= 1; wDiff++) {
      for (let zDiff = -1; zDiff <= 1; zDiff++) {
        for (let yDiff = -1; yDiff <= 1; yDiff++) {
          for (let xDiff = -1; xDiff <= 1; xDiff++) {
            if (wDiff === 0 && zDiff === 0 && yDiff === 0 && xDiff === 0) {
              continue;
            }
            newPoints.push([w + wDiff, z + zDiff, y + yDiff, x + xDiff])
          }
        }
      }
    }
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
  expectedTestAnswers: [848],
});

//suite.test();
suite.solve();
//suite.performance();
