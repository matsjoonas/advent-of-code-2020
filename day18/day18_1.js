const AocSuite = require('../util/AocSuite');

const operators = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
}

function isOperator(char) {
  return !!operators[char];
}

function findBracketEnd(chars, bracketStartIndex) {
  let nestingLevel = 0;
  let bracketEndIndex = -1;
  for (let i = bracketStartIndex; i < chars.length; i++) {
    let char = chars[i];
    if (char === '(') {
      nestingLevel++;
    } else if (char === ')') {
      if (nestingLevel > 1) {
        nestingLevel--;
      } else {
        bracketEndIndex = i;
        break;
      }
    }
  }
  return bracketEndIndex;
}

function getBracketContents(chars, bracketStartIndex) {
  return chars.slice(bracketStartIndex + 1,  findBracketEnd(chars, bracketStartIndex));
}

function getSameLevelComponents(chars) {
  let components = [];
  let componentIndex = 0;
  for (let i = 0; i < chars.length; i++) {
    let char = chars[i];
    let component = char;

    if (component === '(') {
      if (i > 0) {
        componentIndex++;
      }
      const bracketEndIndex = findBracketEnd(chars, i);
      component = chars.slice(i + 1,  bracketEndIndex);
      if (!components[componentIndex]) {
        components[componentIndex] = [];
      }
      components[componentIndex] = component;
      componentIndex++;
      i = bracketEndIndex;
    } else {
      if (!components[componentIndex]) {
        components[componentIndex] = [];
      }
      components[componentIndex].push(component);
    }

  }
  return components;
}

function solver(data) {
  const input = data.toString().trim().split('\r\n');

  function calculateLevel(input, acc) {
    let result = acc;
    let currentOperator;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      if (operators[char]) {
        currentOperator = operators[char];
      } else {
        const thisNumber = parseInt(char, 10);
        if (currentOperator) {
          result = currentOperator(result, thisNumber);
        } else {
          result = thisNumber;
        }
      }
    }
    return result;
  }


  function calculate(input, acc = 0) {
    // get same level components
    const components = getSameLevelComponents(input);

    if (components.length === 1) {
      return calculateLevel(components[0], acc);
    } else {
      return components.reduce((acc, component) => {

        const thisResult = calculate(component, acc.result);

        if (acc.hangingOperator) {
          acc.result = operators[acc.hangingOperator](acc.result, thisResult);
          acc.hangingOperator = null;
        } else {
          acc.result = thisResult;
        }

        let lastChar = component[component.length - 1];
        if (isOperator(lastChar)) {
          acc.hangingOperator = lastChar;
        }

        return acc;
      }, {
        result: 0,
        hangingOperator: null,
      }).result;
    }
  }


  return input.reduce((acc, line) => {
    acc = acc + calculate(line.split(' ').join('').split(''));
    return acc;
  }, 0);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
