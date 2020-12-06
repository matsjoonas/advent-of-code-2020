const fs = require('fs');
const {performance} = require('perf_hooks');
const colors = require('colors');

class AocSuite {
  constructor(config) {
    this.solver = config.solver;
    this.inputPath = config.inputPath || './input.txt';
    this.expectedTestAnswers = config.expectedTestAnswers || [];
    this.testsPath = './' + config.testInputsDir + '/';
  }

  solve() {
    const _self = this;
    fs.readFile(this.inputPath, function(e, data) {
      const answer = _self.solver(data);
      console.log('__________________________________'.blue);
      console.log('The answer is: ')
      console.log(answer);
    });
  }

  test() {
    const _self = this;

    this.expectedTestAnswers.forEach((expectedAnswer, index) => {
      const testPath = `${_self.testsPath}test${index}.txt`;
      fs.readFile(testPath, function(e, data) {
        if (!data) {
          console.log(`Could not find: ${testPath}`.red);
          console.log('----------------------------------'.red);
          return;
        }
        const answer = _self.solver(data);

        if (answer === expectedAnswer) {
          console.log(`PASS ${testPath}`.green);
          console.log(`Expected:`.green, expectedAnswer);
          console.log(`Received:`.green, answer);
          console.log('----------------------------------'.green);
        } else {
          console.log(`FAIL ${testPath}`.red);
          console.log(`Expected:`.red, expectedAnswer);
          console.log(`Received:`.red, answer);
          console.log('----------------------------------'.red);
        }
      });
    });
  }

  performance(nrOfExecutions) {
    const _self = this;
    const nrOfIterations = nrOfExecutions || 1;
    fs.readFile(this.inputPath, function(e, data) {
      const t0 = performance.now();
      for (let i = 0; i < nrOfIterations; i++) {
        _self.solver(data);
      }
      const t1 = performance.now();
      const singleExecutionTime = (t1 - t0) / nrOfIterations;
      console.log('__________________________________'.blue);
      console.log(`Average execution time over ${nrOfIterations} iterations in milliseconds: ${singleExecutionTime}`);
    });
  }
}

module.exports = AocSuite;
