const fs = require('fs');
fs.readFile('./input.txt', (e, data) => {

  const input = data.toString().trim().split('\r\n');

  let treeCount = 0;
  let targetPosition = 0;

  input.forEach((line, i) => {
    // we can disregard the first line
    if (i > 0) {
      targetPosition = targetPosition + 3;
      if (targetPosition > (line.length - 1)) {
        targetPosition = targetPosition - line.length;
      }
      if (line.charAt(targetPosition) === '#') {
        treeCount ++;
      }
    }
  });

  console.log(treeCount);
});
