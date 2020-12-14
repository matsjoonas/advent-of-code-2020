const AocSuite = require('../util/AocSuite');
const _ = require('lodash');

class Computer {
  constructor() {
    this.ptr = 0;
    this.memory = [];
    this.mask = null;
  }

  dec2bin(dec){
    return _.padStart((dec >>> 0).toString(2), 36, '0');
  }

  applyMask(value) {
    const mask = this.mask.split('');
    const bin = this.dec2bin(value).split('');
    const masked = bin.map((char, idx) => {
      if (mask[idx] !== 'X') {
        return mask[idx];
      } else {
        return char;
      }
    });
    return parseInt(masked.join(''), 2);
  }

  runInstruction(instruction) {
    const [opcode, ...rest] = instruction;
    const ops = {
      mem: ([address, value]) => this.memory[address] = value,
      mask: ([value]) => this.mask = value,
    }

    let args = rest;
    if (opcode !== 'mask') {
      args = rest.map(arg => !isNaN(parseInt(arg, 10)) ? parseInt(arg, 10) : arg);
    }

    if (args[1] !== undefined) {
      args[1] = this.applyMask(args[1]);
    }

    ops[opcode](args);
  }

  run(instructions) {
    const _self = this;

    function shouldContinue() {
      return _self.ptr <= instructions.length - 1;
    }

    while (shouldContinue()) {
      _self.runInstruction(instructions[_self.ptr])
      _self.ptr++;
    }

    return {
      memory: _self.memory,
    }
  }
}

function solver(data) {
  const input = data.toString().trim().split('\r\n')
    .map(line => line.split(' = ')
      .map(item => item.split('[')
        .map(item => item.split(']').join(''))
      ).reduce((acc, cur) => {
        return acc.concat(cur);
      }, [])
    );

  const computer = new Computer();

  return computer.run(input).memory.reduce((acc, cur) => acc + cur, 0);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [165],
});

//suite.test();
suite.solve();
//suite.performance();
