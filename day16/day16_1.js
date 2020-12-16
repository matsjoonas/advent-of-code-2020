const AocSuite = require('../util/AocSuite');
const _ = require('lodash');

function solver(data) {
  const input = data.toString().trim()
    .split('your ticket:').join('')
    .split('nearby tickets:').join('')
    .split('\r\n\r\n\r\n');

  function parseValidationRule(ruleString) {
    return ruleString
      .split(' or ')
      .map(item => {
        return item.split('-').map(value => parseInt(value, 10));
      });
  }

  const nearbyTickets = input[2]
    .split('\r\n')
    .map(ticket => ticket.split(',').map(value => parseInt(value, 10)));
  
  let validationRules = input[0].split('\r\n').map(line => {
    return line.split(': ').slice(1).join('');
  }).map(parseValidationRule);

  function checkValidity(value) {
    let isValid = false;
    validationRules.forEach(fieldRule => {
      fieldRule.forEach(span => {
        if (value >= span[0] && value <= span[1]) {
          isValid = true;
        }
      });
    });
    return isValid;
  }

  let errorRate = 0;
  nearbyTickets.forEach(ticket => {
    ticket.forEach(value => {
      if (!checkValidity(value)) {
        errorRate += value;
      }
    });
  });

  return errorRate;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [71],
});

suite.test();
//suite.solve();
//suite.performance();
