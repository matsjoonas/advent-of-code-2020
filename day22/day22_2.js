const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function solver(data) {
  let input = parseInput(data);

  const deck1 = [...input[0]].map(value => parseInt(value));
  const deck2 = [...input[1]].map(value => parseInt(value));

  while (deck1.length !== 0 && deck2.length !== 0) {
    let drawnCards = [deck1.shift(), deck2.shift()]
    let winningDeck;
    if (drawnCards[0] > drawnCards[1]) {
      winningDeck = deck1;
    } else {
      drawnCards = drawnCards.reverse();
      winningDeck = deck2;
    }
    drawnCards.forEach(card => {
      winningDeck.push(card);
    });
  }

  const winningDeck = deck1.length > 0 ? deck1 : deck2;

  return winningDeck.reverse().reduce((acc, card, index) => {
    acc = acc + (card * (index + 1));
    return acc;
  },0)
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [306],
});

//suite.test();
suite.solve();
//suite.performance();
