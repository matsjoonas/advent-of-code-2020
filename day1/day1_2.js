const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n').map(item => parseInt(item.trim()));

  const ascending = input.sort((a, b) => a-b);
  const descending = [...input.sort((a, b) => b-a)]
  let match;

  let reverseStartingIndex = 0;

  for (let i = 0; i < ascending.length; i++) {
    // we only need a single match
    if (match) {
      break;
    }

    for (let k = reverseStartingIndex; k < descending.length; k++) {
      const sum = ascending[i] + descending[k];
      if (sum >= 2020) {
        continue;
      }

      for (let m = i; m < ascending.length; m++) {
        if (sum + ascending[m] === 2020) {
          match = [ascending[i], descending[k], ascending[m]];
          break;
        }
      }
    }
  }

  console.log(match[0] * match[1] * match[2]);
});
