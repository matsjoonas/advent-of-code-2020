const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n').map(item => {
    return {
      pos1: parseInt(item.substring(0, item.indexOf('-'))),
      pos2: parseInt(item.substring(item.indexOf('-') + 1, item.indexOf(' '))),
      letter: item.substring(item.indexOf(':') - 1, item.indexOf(':')),
      pass: item.substring(item.indexOf(': ') + 2, item.length),
    }
  });

  const nrOfValidPasses = input.reduce((acc, cur) => {
    const {pos1, pos2, letter, pass} = cur;
    let count = 0;

    if (pass[pos1 - 1] === letter) {
      count += 1;
    }

    if (pass[pos2 - 1] === letter) {
      count += 1;
    }

    if (count === 1) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  console.log(nrOfValidPasses);
});
