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

  const myTicket = input[1].split(',').map(value => parseInt(value, 10));

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

  let possibleFields = [];
  for (const key of Object.keys(fieldMap)) {
    possibleFields.push({
      name: key,
      fields: fieldMap[key],
    });
  }
  possibleFields = possibleFields.sort((a, b) => a.fields.length - b.fields.length);
  const assignedFieldNames = {};
  const assignedFields = [];
  possibleFields.forEach(item => {
    // remove all already assigned fields
    const fields = _.difference(item.fields, assignedFields);

    if (fields.length === 1) {
      assignedFields.push(fields[0]);
      assignedFieldNames[item.name] = fields[0];
    }
  });

  let answer = 1;
  for (const key of Object.keys(assignedFieldNames)) {
    if (key.indexOf('departure') !== -1) {
      answer = myTicket[parseInt(assignedFieldNames[key], 10)] * answer;
    }
  }

  return answer;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [71],
});

//suite.test();
suite.solve();
//suite.performance();
