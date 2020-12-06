const fs = require('fs');
const {performance} = require('perf_hooks');

module.exports = function(inputPath, solve) {
  fs.readFile(inputPath, function(e, data) {
    const t0 = performance.now();
    const answer = solve(data);
    const t1 = performance.now();
    console.log('');
    console.log('\x1b[36m%s\x1b[0m', '__________________________________');
    console.log(`Execution time in milliseconds: ${t1 - t0}`);
    console.log('The answer is: ')
    console.log(answer);
  });
}
