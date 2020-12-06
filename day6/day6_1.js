const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n');

  function getGroups(input) {
    const groups = [];
    let groupIdx = 0;
    input.forEach(line => {
      if (line === '') {
        groupIdx++;
        return;
      }
      if (!groups[groupIdx]) {
        groups[groupIdx] = [];
      }
      groups[groupIdx].push(line);
    });

    return groups;
  }

  function unique(str) {
    return [...new Set(str)].join('');
  }

  const count = getGroups(input).reduce((acc, cur) => {
    return acc + unique(cur.join('')).length;
  }, 0);

  console.log(count);
});
