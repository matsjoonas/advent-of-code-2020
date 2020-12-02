const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n').map(item => parseInt(item.trim()));
  // sum is 2020
  //
  const ascending = input.sort((a, b) => a-b);
  const descending = [...input.sort((a, b) => b-a)]
  const matches = [];

  let reverseStartingIndex = 0;

  for (let i = 0; i < ascending.length; i++) {
    // we only need 2 matches
    if (matches.length) {
      break;
    }

    for (let k = reverseStartingIndex; k < descending.length; k++) {
      if ((ascending[i] + descending[k]) === 2020) {
        matches.push([ascending[i], descending[k]]);
        reverseStartingIndex = k;
        break;
      }
    }
  }

  console.log(matches[0][0] * matches[0][1]);
});
