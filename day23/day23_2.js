const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');


function getMovingValues(currentCup) {
  return [currentCup.next.value, currentCup.next.next.value, currentCup.next.next.next.value];
}

function getDestinationValue(cups, movingValues, currentCupValue) {
  let destinationValue = currentCupValue - 1;

  if (destinationValue <= 0) {
    destinationValue = cups.length;
  }

  if (movingValues.includes(destinationValue)) {
    destinationValue = getDestinationValue(cups, movingValues, destinationValue);
  }
  return destinationValue;
}

function solver(data) {
  let cups = parseInput(data);

  for (let i = Math.max(...cups) + 1; i <= 1000000; i++) {
    cups.push(i);
  }

  cups = cups.map(value => ({value}));
  cups = cups.map((item, index) => {
    if (index < cups.length - 1) {
      item.next = cups[index + 1]
    } else {
      item.next = cups[0];
    }

    return item;
  });

  const cupsList = new Map(cups.map((item) => [item.value, item]));


  let nrOfTurns = 10000000;
  let currentCup = cups[0];
  for (let i = 0; i < nrOfTurns; i++) {
    const movingValues = getMovingValues(currentCup);

    let destinationValue = getDestinationValue(cups, movingValues, currentCup.value);
    const cachedCurrentCupNext = currentCup.next;
    currentCup.next = currentCup.next.next.next.next;

    let destination = cupsList.get(destinationValue);

    cachedCurrentCupNext.next.next.next = destination.next;
    destination.next = cachedCurrentCupNext;

    currentCup = currentCup.next;
  }

  const cup1 = cupsList.get(1);
  return cup1.next.value * cup1.next.next.value;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [149245887792],
});

//suite.test();
suite.solve();
//suite.performance();
