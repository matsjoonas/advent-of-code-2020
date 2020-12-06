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

  function intersection(str1, str2) {
    return str1
      .split('')
      .filter(x => str2.split('').includes(x))
      .join('');
  }

  const count = getGroups(input).reduce((total, group) => {
    return total + group.reduce(intersection, group[0]).length;
  }, 0);

  console.log(count);
});
