const AocSuite = require('../util/AocSuite');

class Computer {
  constructor() {
    this.acc = 0;
    this.ptr = 0;
    this.executed = [];
    this.status = null;
    this.ops = {
      nop: () => this.ptr++,
      acc: (arg) => {
        this.acc += arg;
        this.ptr++;
      },
      jmp: (arg) => this.ptr += arg,
    }
    this.STATUS_CODES = {
      error: 'error',
      terminated: 'terminated',
    };
  }

  reset() {
    this.acc = 0;
    this.ptr = 0;
    this.executed = [];
    this.status = null;
  }

  setStatus(code, msg) {
    this.status = {
      code,
      msg,
    }
  }

  run(instructions) {
    this.reset();
    const _self = this;

    function shouldContinue() {
      if (_self.ptr > instructions.length - 1) {
        _self.setStatus(_self.STATUS_CODES.terminated, `ptr: ${_self.ptr} points to a nonexistent instruction`);
        return false;
      } else if (_self.executed[_self.ptr]) {
        _self.setStatus(_self.STATUS_CODES.error, `instruction ${_self.ptr} has already been executed`);
        return false;
      } else {
        return true;
      }
    }

    while (shouldContinue()) {
      _self.executed[_self.ptr] = true;
      const [opcode, arg] = instructions[_self.ptr];
      _self.ops[opcode](arg);
    }

    return {
      status: _self.status,
      acc: _self.acc,
    }
  }
}

function solver(data) {
  const instructions = data.toString().trim().split('\r\n')
    .map(line => {
      const formatted = line.split(' ');
      return [formatted[0], parseInt(formatted[1])];
    });

  const gameConsole = new Computer();

  for (let i = 0; i < instructions.length; i++) {
    if (instructions[i][0] === 'acc') {
      continue;
    }

    let modifiedInstructions = [...instructions];
    let newInstruction = [...modifiedInstructions[i]]
    if (newInstruction[0] === 'jmp') {
      newInstruction[0] = 'nop';
    } else if (newInstruction[0] === 'nop') {
      newInstruction[0] = 'jmp';
    }
    modifiedInstructions[i] = newInstruction;

    const result = gameConsole.run(modifiedInstructions);

    if (result.status.code === gameConsole.STATUS_CODES.terminated) {
      return result.acc;
    }
  }
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs2',
  expectedTestAnswers: [8],
});

//suite.test();
suite.solve();
//suite.performance();
