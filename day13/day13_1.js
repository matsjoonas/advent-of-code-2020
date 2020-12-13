const AocSuite = require('../util/AocSuite');

function solver(data) {
  const input = data.toString().trim().split('\r\n');
  const leaveAt = input[0];
  const buses = input[1].split(',x').join('').split(',').map(item => parseInt(item, 10));

  function closestBusTo(timestamp) {
    return buses.reduce((acc, cur) => {
      let curBus = {
        waitTime: timestamp % cur,
        id: cur,
      };
      let prevBus = acc;
      if (!prevBus) {
        prevBus = curBus;
      }
      return (prevBus.waitTime < curBus.waitTime ? prevBus : curBus);
    }, null);
  }

  let earliestTime = leaveAt;
  let currentTime = earliestTime;
  let suitableBus;
  while (true) {
    let waitingTime = currentTime - earliestTime;
    let closestBus = closestBusTo(currentTime);
    if (closestBus.waitTime <= waitingTime) {
      suitableBus = closestBus;
      break;
    }

    currentTime++;
  }

  return (currentTime - earliestTime) * suitableBus.id;
}

const suite = new AocSuite({
  solver,
  testInputsDir: 'testInputs1',
  expectedTestAnswers: [295],
});

//suite.test();
suite.solve();
//suite.performance();
