const AocSuite = require('../util/AocSuite');
const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [4],
});

//suite.performance();
suite.test();
suite.solve();

function solver(data) {
  const input = data.toString().trim().split('\r\n');
  const processed = input.map(line => {
    let processedLine = line.split('.').join('')
      .split(',').join('')
      .split('contain').join('')
      .split('bags').join('|')
      .split('bag').join('|')
      .split('  ').join(' ')
      .split('|')
      .map((item, idx) => {
        let newItem = item.trim();
        if (idx > 0) {
          newItem = newItem.substr(2);
        }
        return newItem;
      })
      .filter(item => item !== '' && item !== ' other');

    return {
      name: processedLine[0],
      contents: processedLine.slice(1),
    };
  }).filter(item => item.name !== 'shiny gold' && item.contents.length !== 0)
    .reduce((acc, cur) => {
      acc[cur.name] = cur.contents;
      return acc;
    }, {});


  const possibleChildren = (name) => {
    let contents = processed[name] || [];
    const colors = [...contents];

    contents.forEach(color => colors.push(...possibleChildren(color)));

    return colors;
  };

  return Object
    .keys(processed)
    .filter((key) => possibleChildren(key).includes('shiny gold'))
    .length;
}


