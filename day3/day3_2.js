const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n');

  const allTreeCounts = [];

  [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]].forEach(slope => {
    let treeCount = 0;
    let targetPosition = 0;

    input.forEach((line, i) => {
      // we can disregard the first lines
      if (i > slope[1] - 1) {
        if (i % slope[1] !== 0) {
          return;
        }
        targetPosition = targetPosition + slope[0];
        if (targetPosition > (line.length - 1)) {
          targetPosition = targetPosition - line.length;
        }
        if (line.charAt(targetPosition) === '#') {
          treeCount ++;
        }
      }
    });

    allTreeCounts.push(treeCount);
  });

  console.log(allTreeCounts);
  console.log(allTreeCounts.reduce((a, b) => a * b, 1));
});
