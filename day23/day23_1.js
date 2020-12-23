const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');


function spliceCups(cups, startingIdx, nrOfCups) {
  const removedCups = [];
  for (let i = 0; i < nrOfCups; i++) {
    if (startingIdx > cups.length - 1) {
      startingIdx = 0;
    }
    removedCups.push(cups.splice(startingIdx, 1)[0]);
  }
  return removedCups;
}

function findDestinationCupIndex(cups, currentCup) {
  const scratchCups = [...cups];
  let destinationCupLabel = scratchCups.sort((a, b) => b - a)
    .find(cup => cup < currentCup);

  if (destinationCupLabel === undefined) {
    destinationCupLabel = scratchCups.sort((a, b) => b - a)[0];
  }

  return cups.findIndex(cup => cup === destinationCupLabel);
}

function insertCups(cups, destinationIndex, cupsToInsert) {
  cupsToInsert.reverse().forEach(cup => {
    cups.splice(destinationIndex, 0, cup);
  });
}

function maybeRealignCups(cups, currentCup, currentCupOriginalIndex) {
  const currentCupNewIndex = cups.findIndex(cup => cup === currentCup);
  if (currentCupNewIndex !== currentCupOriginalIndex) {
    const diff = currentCupNewIndex - currentCupOriginalIndex;
    return [...cups, ...cups].slice(diff, diff + cups.length);
  } else {
    return cups;
  }
}


function solver(data) {
  let cups = parseInput(data);

  let nrOfTurns = 100;
  let currentCupIdx = 0;
  for (let i = 0; i < nrOfTurns; i++) {
    if (currentCupIdx > cups.length - 1) {
      currentCupIdx = 0;
    }
    const currentCup = cups[currentCupIdx];
    const movingCups = spliceCups(cups, currentCupIdx + 1, 3)
    const destinationCupIndex = findDestinationCupIndex(cups, currentCup);
    insertCups(cups, destinationCupIndex + 1, movingCups);
    cups = maybeRealignCups(cups, currentCup, currentCupIdx);

    currentCupIdx++;
  }

  return [...cups, ...cups].slice(cups.indexOf(1) + 1, cups.length + 1).join('');
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: ['67384529'],
});

//suite.test();
suite.solve();
//suite.performance();
