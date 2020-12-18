const AocSuite = require('../util/AocSuite');

function toInt(str) {
  return parseInt(str, 10);
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
      component = chars.slice(i + 1, bracketEndIndex);
      i = bracketEndIndex;
    }
    components.push(component);
    componentIndex++;
  }
  return components;
}

function calculateLevel(input) {
  const priorityResults = [];
  input.join('').split('*').forEach(group => {
    const operands = group.split('+').map(toInt);
    if (operands.length > 1) {
      const result = operands.reduce((acc, number) => acc + number, 0)
      priorityResults.push(result);
    } else {
      priorityResults.push(operands[0]);
    }
  });

  return priorityResults.reduce((acc, number) => {
    return acc * number;
  }, 1)
}

function solver(data) {
  const input = data.toString().trim().split('\r\n');

  function calculate(level) {
    const levelComponents = getSameLevelComponents(level);
    return calculateLevel(levelComponents.map(component => {
      if (Array.isArray(component)) {
        return calculate(component);
      } else {
        return component;
      }
    }));
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
