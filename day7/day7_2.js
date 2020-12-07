const AocSuite = require('../util/AocSuite');
const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [126, 32],
});

//suite.performance();
//suite.test();
suite.solve();

function solver(data) {
  const input = data.toString().trim().split('\r\n').map(line => {
    let processedLine = line.split('.').join('')
      .split(',').join('')
      .split('contain').join('')
      .split('bags').join('|')
      .split('bag').join('|')
      .split('  ').join(' ')
      .split('|')
      .filter(item => item !== '' && item.trim() !== 'no other')
      .map((item, idx) => {
        let newItem = item.trim();
        if (idx > 0) {
          newItem = [newItem.substr(2), parseInt(newItem.substr(0, 1))];
        }
        return newItem;
      });

    return {
      name: processedLine[0],
      contents: processedLine.slice(1),
    };
  }).reduce((acc, cur) => {
      acc[cur.name] = cur.contents;
      return acc;
    }, {});

  const getNrOfChildren = (name, parentCount) => {
    let children = input[name] || [];
    let nrOfChildren = children.reduce((acc, cur) => {
      return acc + cur[1];
    }, 0);
    children.forEach(child => nrOfChildren += getNrOfChildren(child[0], child[1]));
    return (parentCount || 1) * nrOfChildren;
  };

  return getNrOfChildren('shiny gold');
}


