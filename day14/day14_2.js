const AocSuite = require('../util/AocSuite');
const _ = require('lodash');

class Computer {
  constructor() {
    this.ptr = 0;
    this.memory = {};
    this.mask = null;
  }

  dec2bin(dec) {
    return _.padStart((dec >>> 0).toString(2), 36, '0');
  }

  applyMask(value) {
    const mask = this.mask.split('');
    const bin = this.dec2bin(value).split('');
    let maskedAddresses = [];
    const masked = bin.map((char, idx) => {
      if (mask[idx] === '1') {
        return mask[idx];
      } else {
        return char;
      }
    });

    maskedAddresses.push(masked);
    bin.forEach((char, idx) => {
      if (mask[idx] === 'X') {
        const newAddresses = [];
        maskedAddresses.forEach(address => {
          const new1 = [...address];
          const new2 = [...address];
          new1[idx] = '0';
          new2[idx] = '1';
          newAddresses.push(new1);
          newAddresses.push(new2);
        });
        maskedAddresses = maskedAddresses
          .concat(newAddresses);
      }
    });

    return maskedAddresses.map(item => item.join(''));
  }

  runInstruction(instruction) {
    const [opcode, ...rest] = instruction;
    const ops = {
      mem: ([address, value]) => {
        const addresses = this.applyMask(address);
        addresses.forEach(address => {
          this.memory[address] = value;
        });
      },
      mask: ([value]) => this.mask = value,
    }

    let args = rest;
    if (opcode !== 'mask') {
      args = rest.map(arg => !isNaN(parseInt(arg, 10)) ? parseInt(arg, 10) : arg);
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
  const result = computer.run(input).memory;

  let sum = 0;
  for (const [key, value] of Object.entries(result)) {
    sum += value;
  }

  return sum;


}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [208],
});

//suite.test();
suite.solve();
//suite.performance();
