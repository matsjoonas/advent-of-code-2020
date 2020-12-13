const AocSuite = require('../util/AocSuite');


class Vehicle {
  constructor(config) {
    this.position = {
      x: 0,
      y: 0,
    };

    this.wp = {
      x: 10,
      y: 1,
    }
    this.init();
  }

  act(instruction) {
    const action = instruction.substring(0, 1);
    const value = parseInt(instruction.substring(1), 10);
    this.actions[action](value);
  }

  execute(instructions) {
    instructions.forEach(instruction => this.act(instruction));
    return this.position;
  }

  rotate90Clockwise(point) {
    return {
      x: point.y,
      y: -point.x,
    }
  }

  rotate90CounterClockwise(point) {
    return {
      x: -point.y,
      y: point.x,
    }
  }

  rotateAboutTheOrigin(point, degrees) {
    let rotate = this.rotate90CounterClockwise;
    if (degrees < 0) {
      rotate = this.rotate90Clockwise;
    }
    const nrOfRotations = Math.abs(degrees) / 90;

    let newPoint = point;
    for (let i = 0; i < nrOfRotations; i++) {
      newPoint = rotate(newPoint);
    }

    return newPoint;
  }

  rotateWp(degrees) {
    this.wp = this.rotateAboutTheOrigin(this.wp, degrees);
  }

  init() {
    this.actions = {
      N: value => this.wp.y += value,
      S: value => this.wp.y -= value,
      E: value => this.wp.x += value,
      W: value => this.wp.x -= value,
      L: value => {
        this.rotateWp(value);
      },
      R: value => {
        this.rotateWp(-value);
      },
      F: value => {
        this.position.y += (this.wp.y * value);
        this.position.x += (this.wp.x * value);
      },
    };
  }
}

function solver(data) {
  const input = data.toString().trim().split('\r\n');

  const ferry = new Vehicle();
  const finalPosition = ferry.execute(input);

  return Math.abs(finalPosition.x) + Math.abs(finalPosition.y);
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [null],
});

//suite.test();
suite.solve();
//suite.performance();
