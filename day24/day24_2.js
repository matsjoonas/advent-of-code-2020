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

function getAdjacentTiles(tile, gridState) {
  const adjacentTiles = new Map();
  Object.values(directionsMap).forEach(direction => {
    const adjacent = step(tile, direction);
    const key = pointToString(adjacent);
    adjacentTiles.set(key, gridState.get(key))
  });

  return adjacentTiles;
}

function getAdjacentTileValues(tile, gridState) {
  return Object.values(directionsMap).map(direction => {
    const adjacent = step(tile, direction);
    return gridState.get(pointToString(adjacent));
  });
}

function getAdjacentBlacksCount(tile, gridState) {
  return getAdjacentTileValues(tile, gridState).filter(value => value).length;
}

function stringToPoint(str) {
  return str.split('_').map(value => parseInt(value, 10));
}

function expand(gridState) {
  const newPoints = new Map();
  gridState.forEach((value, key) => {
    const neighbours = getAdjacentTiles(stringToPoint(key), gridState);
    newPoints.set(key, value);
    neighbours.forEach((point, key) => {
      if (!newPoints.get(key)) {
        newPoints.set(key, false);
      }
    });
  });

  return newPoints;
}

function prune(gridState) {
  const newGrid = new Map();
  gridState.forEach((value, key) => {
    if (value) {
      newGrid.set(key, value);
    }
  });
  return newGrid;
}


function countBlacks(gridState) {
  let count = 0;
  gridState.forEach(tile => {
    if (tile) {
      count++;
    }
  });
  return count;
}

function getNewFrame(gridState) {
  const workingGridState = expand(gridState);
  const newGridState = new Map();
  workingGridState.forEach((currentTileValue, currentTileKey) => {
    const adjacentBlacksCount = getAdjacentBlacksCount(stringToPoint(currentTileKey), gridState);
    let newTileValue = currentTileValue;
    if (currentTileValue && (adjacentBlacksCount === 0 || adjacentBlacksCount > 2)) {
      newTileValue = false;
    } else if (!currentTileValue && adjacentBlacksCount === 2) {
      newTileValue = true;
    }
    newGridState.set(currentTileKey, newTileValue);
  });

  return prune(newGridState);
}

function solver(data) {
  let input = parseInput(data)
    .map(line => line.map(d => directionsMap[d]));

  const gridState = new Map();
  input.map(line => line.reduce(step, [0, 0, 0]))
    .forEach(tileCoords => {
      let key = pointToString(tileCoords);
      gridState.set(key, !gridState.get(key));
    });


  let currentGridState = gridState;

  for (let i = 0; i < 100; i++) {
    currentGridState = getNewFrame(currentGridState);
  }


  return countBlacks(currentGridState);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [2208],
});

// 4070
//suite.test();
suite.solve();
//suite.performance();
