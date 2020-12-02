const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n').map(item => {
    return {
      min: parseInt(item.substring(0, item.indexOf('-'))),
      max: parseInt(item.substring(item.indexOf('-') + 1, item.indexOf(' '))),
      letter: item.substring(item.indexOf(':') - 1, item.indexOf(':')),
      pass: item.substring(item.indexOf(': ') + 2, item.length),
    }
  });

  const nrOfValidPasses = input.reduce((acc, cur) => {
    const nrOfOccurrences = cur.pass.split(cur.letter).length - 1;
    if (nrOfOccurrences >= cur.min && nrOfOccurrences <= cur.max) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  console.log(input[0]);
  console.log(input[1]);
  console.log(input[2]);
  console.log(input[3]);
  console.log(nrOfValidPasses);
});
