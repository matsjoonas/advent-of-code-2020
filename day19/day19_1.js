const AocSuite = require('../util/AocSuite');
const _ = require('lodash');

function solver(data) {
  const initial = data.toString().trim()
    .split('\r\n\r\n')
    .map(item => item.split('\r\n'));

  const rules = new Map(initial[0].map(line => {
    const rule = line.split(': ');
    rule[0] = parseInt(rule[0]);

    // handle the values between ""
    if (rule[1].split('"').length > 1) {
      rule[1] = rule[1].split('"').join('');
    } else {
      rule[1] = rule[1].split(' | ').map(part => {
        return part.split(' ').map(value => parseInt(value, 10));
      });
    }

    return rule;
  }));

  const messages = initial[1];

  // https://github.com/AlexAegis/advent-of-code/blob/master/src/2020/day19/typescript/part_two.ts
  function match(message, ruleIndex = 0, charIndex = 0) {
    const thisRule = rules.get(ruleIndex);

    // check whether the current character matches with the current rule
    if (thisRule === 'a' || thisRule === 'b') {
      if (message[charIndex] === thisRule) {
        return [charIndex + 1];
      } else {
        return [];
      }
    } else {
      // thisRule is an array of 'or' rules (lvl1) and each 'or' rule is an array of 'and' rules (lvl2)
      // and each 'and' rule is basically a pointer to a character or to another complex rule
      // we'll map over the 'or' rules and reduce the 'and' rules

      // we map over each part and try to find matching indexes
      // keep in mind that first level is 'or' match and contains two parts
      // this also means that the map result here will contain two arrays
      // so flattening this array leaves us with the final result as a single item array e.g. [6]
      const lvl1Result = thisRule.map((lvl2) => {
        // lvl2 result has to be a single array that contains a single index e.g. [4]
        // that single index is the
        return lvl2.reduce((acc, ruleIndex) => {
          return _.flatten(acc.map((charIndex) => match(message, ruleIndex, charIndex)));
        }, [charIndex]);
      });
      return _.flatten(lvl1Result);
    }
  }

  let matchCount = 0;
  messages.forEach(message => {
    if (match(message)[0] === message.length) {
      matchCount++;
    }
  })

  return matchCount;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [12],
});

//suite.test();
suite.solve();
//suite.performance();
