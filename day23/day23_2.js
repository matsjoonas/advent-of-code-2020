const _ = require('lodash');
const AocSuite = require('../util/AocSuite');
const parseInput = require('./parseInput');

function stateKey(a, b) {
  return a + b;
}

function solver(data) {
  let input = parseInput(data);

  const deck1 = [...input[0]].map(value => parseInt(value));
  const deck2 = [...input[1]].map(value => parseInt(value));

  function playOneGame(deck1, deck2) {
    const prevRounds = new Set();

    let earlyWinner;
    let winningDeck;
    let winner;

    while (deck1.length !== 0 && deck2.length !== 0) {
      let drawnCards;

      if (prevRounds.has(stateKey(deck1, deck2))) {
        earlyWinner = 1;
      } else {
        prevRounds.add(stateKey(deck1, deck2));
        drawnCards = [deck1.shift(), deck2.shift()]

        if (drawnCards[0] <= deck1.length && drawnCards[1] <= deck2.length) {
          const result = playOneGame(deck1.slice(0, drawnCards[0]), deck2.slice(0, drawnCards[1]));
          winner = result.winner;
        } else {
          if (drawnCards[0] > drawnCards[1]) {
            winner = 1;
          } else {
            winner = 2;
          }
        }
      }

      if (earlyWinner) {
        winner = earlyWinner;
      }

      if (winner === 1) {
        winningDeck = deck1;
      } else {
        drawnCards = drawnCards.reverse();
        winningDeck = deck2;
      }

      if (drawnCards) {
        drawnCards.forEach(card => {
          winningDeck.push(card);
        });
      }

      if (earlyWinner) {
        break;
      }
    }

    return {
      earlyWinner,
      winner: winner,
      deck: winningDeck,
    }
  }

  return playOneGame(deck1, deck2).deck.reverse().reduce((acc, card, index) => {
    acc = acc + (card * (index + 1));
    return acc;
  }, 0)
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [105, 291],
});

//suite.test();
suite.solve();
//suite.performance();
