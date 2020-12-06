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

  function intersection(array) {
    return array.reduce((acc, cur) => {
      const curAsArray = cur.split('');
      if (!acc) {
        return curAsArray;
      }
      return acc.filter(x => curAsArray.includes(x));
    }, null);
  }


  const count = getGroups(input).reduce((total, group) => {
    return total + intersection(group).length;
  }, 0);

  console.log(count);
});
