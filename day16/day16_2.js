const AocSuite = require('../util/AocSuite');
const _ = require('lodash');

function solver(data) {
  const input = data.toString().trim()
    .split('your ticket:').join('')
    .split('nearby tickets:').join('')
    .split('\r\n\r\n\r\n');

  function parseValidationRule(ruleString) {
    return {
      name: ruleString[0],
      rules: ruleString[1]
        .split(' or ')
        .map(item => {
          return item.split('-').map(value => parseInt(value, 10));
        }),
    }
  }

  const nearbyTickets = input[2]
    .split('\r\n')
    .map(ticket => ticket.split(',').map(value => parseInt(value, 10)));

  let validationRules = input[0].split('\r\n').map(line => {
    return line.split(': ');
  }).map(parseValidationRule);

  function checkValidity(value) {
    let isValid = false;
    validationRules.forEach(field => {
      field.rules.forEach(span => {

        if (value >= span[0] && value <= span[1]) {
          isValid = true;
        }
      });
    });
    return isValid;
  }

  let errorRate = 0;
  const validTickets = nearbyTickets.filter(ticket => {
    let shouldKeep = true;
    ticket.forEach(value => {
      if (!checkValidity(value)) {
        errorRate += value;
        shouldKeep = false;
      }
    });
    return shouldKeep;
  });

  const valuesByField = [];
  validTickets.forEach(ticket => {
    ticket.forEach((value, idx) => {
      if (!valuesByField[idx]) {
        valuesByField[idx] = [];
      }
      valuesByField[idx].push(value);
    });
  });



  //console.log(valuesByField);
  //console.log(validationRules);

  function matchWithField(values, field) {
    const validValues = values.filter(value => {
      let isValid = false;

      field.rules.forEach(span => {
        if (value >= span[0] && value <= span[1]) {
          isValid = true;
        }
      });

      return isValid;
    });

    return validValues.length === values.length;
  }

  const fieldMap = {};
  valuesByField.forEach((values, idx) => {
    validationRules.forEach(fieldRule => {
      if (matchWithField(values, fieldRule)) {
        if (!fieldMap[fieldRule.name]) {
          fieldMap[fieldRule.name] = [];
        }
        fieldMap[fieldRule.name].push(idx);
      }
    })
  });

  console.log(fieldMap);

  return errorRate;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [71],
});

//suite.test();
suite.solve();
//suite.performance();
